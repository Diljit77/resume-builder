import Resume from "../models/ResumeModel.js";

import puppeteer from "puppeteer";
import htmlDocx from "html-docx-js";  
export const Addresume=async (req, res) => {
  try {
    const resume = await Resume.create({ ...req.body, userId: req.userId });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}
export const getResume=async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}
export const updateresume=async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    res.json(resume);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}
export const deleteresume=async (req, res) => {
  try {
    await Resume.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ msg: "Resume deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}






export const downloadresume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ error: "Resume not found" });

    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { font-size: 22px; border-bottom: 1px solid #ccc; }
            h2 { font-size: 18px; margin-top: 15px; border-bottom: 1px solid #eee; }
            p, li { font-size: 14px; line-height: 1.5; }
          </style>
        </head>
        <body>
          <h1>${resume.personal.name}</h1>
          <p>${resume.personal.email} | ${resume.personal.phone}</p>
          <p>${resume.personal.address || ""}</p>

          ${resume.summary ? `<h2>Summary</h2><p>${resume.summary}</p>` : ""}

          ${resume.education?.length ? `<h2>Education</h2>
            ${resume.education.map(e => `<p><b>${e.degree}</b> - ${e.school} (${e.year})</p>`).join("")}` : ""}

          ${resume.experience?.length ? `<h2>Experience</h2>
            ${resume.experience.map(exp => `
              <p><b>${exp.role}</b> at ${exp.company} (${exp.duration})</p>
              <p>${exp.description}</p>`).join("")}` : ""}
        </body>
      </html>
    `;

    // ⚡ html-docx-js in Node only provides asBlob()
    const blob = htmlDocx.asBlob(html);

    // Convert the fake blob into a Buffer
    const docxBuffer = Buffer.from(await blob.arrayBuffer());

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=resume-${resume.personal.name}.docx`
    );
    res.end(docxBuffer);

  } catch (err) {
    res.status(500).json({ error: "Error generating DOCX" });
    console.error(err);
  }
};






export const downloadpdf = async (req, res) => {
  try {
      const resume = await Resume.findById(req.params.id);
  if (!resume) return res.status(404).json({ error: "Resume not found" });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  
  await page.setContent(`
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { font-size: 22px; border-bottom: 1px solid #ccc; }
          h2 { font-size: 18px; margin-top: 15px; border-bottom: 1px solid #eee; }
          p, li { font-size: 14px; line-height: 1.5; }
        </style>
      </head>
      <body>
        <h1>${resume.personal.name}</h1>
        <p>${resume.personal.email} | ${resume.personal.phone}</p>
        <p>${resume.personal.address || ""}</p>

        ${resume.summary ? `<h2>Summary</h2><p>${resume.summary}</p>` : ""}

        ${resume.education.length > 0 ? `<h2>Education</h2>
          ${resume.education.map(e => `<p><b>${e.degree}</b> - ${e.school} (${e.year})</p>`).join("")}` : ""}
        
        ${resume.experience.length > 0 ? `<h2>Experience</h2>
          ${resume.experience.map(exp => `
            <p><b>${exp.role}</b> at ${exp.company} (${exp.duration})</p>
            <p>${exp.description}</p>`).join("")}` : ""}
      </body>
    </html>
  `);

  const pdfBuffer = await page.pdf({ format: "A4" });
  await browser.close();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=resume-${resume.personal.name}.pdf`);
  res.send(pdfBuffer);
    
  } catch (error) {
    res.status(500).json({ error: "Error generating PDF" });
    console.log(error);
  }

};
