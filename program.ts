// Single source of truth for the conference program PDF.
//
// The program is hosted in Google Drive so it can be updated without a code
// change or redeploy: replace it in Drive with "Manage versions -> Upload new
// version", which keeps the same file ID and therefore the same links below.
// Only if the file is ever replaced outright (a brand-new file rather than a
// new version of this one) does this ID need to change.
export const PROGRAM_FILE_ID = "1fZAyBu_rPICp3EgYQ3Otmy6Ev9xrEUPF";

// Human-facing link: opens the PDF in Drive's viewer.
export const PROGRAM_URL = `https://drive.google.com/file/d/${PROGRAM_FILE_ID}/view`;

// Direct file endpoint. Unlike the Drive API it needs no API key, and it
// reports the stored file's Last-Modified header — which is how the site shows
// a real "updated" date rather than a hardcoded one that would go stale.
export const PROGRAM_DOWNLOAD = `https://drive.usercontent.google.com/download?id=${PROGRAM_FILE_ID}&export=download`;
