/**
 * Free "database" for Mahmoud & Nada's engagement wishes, using a Google Sheet.
 * Paste this whole file into Extensions → Apps Script of your sheet,
 * then Deploy → New deployment → Web app (see SETUP.md).
 *
 * Sheet tab "Wishes", row 1 headers:  Time | Name | Message | Show
 * To hide a wish from the website, change its "Show" cell to: no
 */

const SHEET_NAME = 'Wishes';

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Time', 'Name', 'Message', 'Show']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// The website reads the wishes from here (newest first)
function doGet() {
  const rows = getSheet_().getDataRange().getValues().slice(1);
  const wishes = rows
    .filter(r => r[1] && r[2] && String(r[3]).trim().toLowerCase() !== 'no')
    .map(r => ({ name: String(r[1]), message: String(r[2]) }))
    .reverse();
  return json_({ ok: true, wishes: wishes });
}

// The website sends a new wish here
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const name = String(data.name || '').trim().slice(0, 60);
    const message = String(data.message || '').trim().slice(0, 500);
    if (!name || !message) return json_({ ok: false, error: 'Name and message are required' });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      // A leading ' stops Google Sheets treating text like "=..." as a formula
      getSheet_().appendRow([new Date(), "'" + name, "'" + message, 'yes']);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: 'Could not save the wish' });
  }
}
