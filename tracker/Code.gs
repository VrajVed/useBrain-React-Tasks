// useBrain tracker. Paste into the Apps Script editor of the Google Sheet
// (Extensions > Apps Script), run setup() once, then deploy as a web app.

var PROGRESS = 'Progress'
var LOG = 'Log'
var ROSTER = 'Roster'
var TOKEN_KEY = 'USEBRAIN_TOKEN'
var PASS = '\u2705'

function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  sheet_(ss, PROGRESS, ['GitHub', 'Name', 'Done'])
  sheet_(ss, LOG, ['When', 'GitHub', 'Name', 'Exercise', 'Commit'])
  sheet_(ss, ROSTER, ['GitHub', 'Name'])
  var props = PropertiesService.getScriptProperties()
  var token = props.getProperty(TOKEN_KEY)
  if (!token) {
    token = (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, '')
    props.setProperty(TOKEN_KEY, token)
  }
  Logger.log('Put this in the GitHub secret USEBRAIN_TRACKER_TOKEN: ' + token)
}

function doGet() {
  return json_({ ok: true, service: 'usebrain tracker' })
}

function doPost(e) {
  var lock = LockService.getScriptLock()
  lock.waitLock(30000)
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}')
    var token = PropertiesService.getScriptProperties().getProperty(TOKEN_KEY)
    if (!token || body.token !== token) return json_({ ok: false, error: 'bad token' })
    return json_(applySnapshot_(SpreadsheetApp.getActiveSpreadsheet(), body))
  } catch (err) {
    return json_({ ok: false, error: String(err) })
  } finally {
    lock.releaseLock()
  }
}

function applySnapshot_(ss, body) {
  var exercises = body.exercises || []
  var students = body.students || []
  var progress = sheet_(ss, PROGRESS, ['GitHub'])
  var log = sheet_(ss, LOG, ['When', 'GitHub', 'Name', 'Exercise', 'Commit'])
  var names = roster_(ss)
  var before = previousPasses_(progress)
  var newlyPassed = 0

  var rows = students.map(function (s) {
    var key = String(s.github).toLowerCase()
    var name = names[key] || ''
    var ex = s.exercises || {}
    var done = 0
    var notes = 0
    var cells = exercises.map(function (id) {
      var r = ex[id] || {}
      if (r.passed) {
        done++
        if (!(before[key] && before[key][id])) {
          log.appendRow([new Date(), s.github, name, id, String(s.sha || '').slice(0, 7)])
          newlyPassed++
        }
      }
      if (r.notes) notes++
      return r.passed ? PASS : ''
    })
    return [s.github, name, done, notes + '/' + exercises.length]
      .concat(cells)
      .concat([String(s.sha || '').slice(0, 7), s.checkedAt ? new Date(s.checkedAt) : ''])
  })

  rows.sort(function (a, b) {
    return b[2] - a[2] || String(a[0]).localeCompare(String(b[0]))
  })

  var header = ['GitHub', 'Name', 'Done', 'Notes'].concat(exercises).concat(['Commit', 'Checked at'])
  progress.clear()
  progress.getRange(1, 1, rows.length + 1, header.length).setValues([header].concat(rows))
  progress.setFrozenRows(1)

  return { ok: true, students: rows.length, newlyPassed: newlyPassed }
}

function previousPasses_(sheet) {
  var values = sheet.getDataRange().getValues()
  var out = {}
  if (values.length < 2) return out
  var header = values[0]
  for (var r = 1; r < values.length; r++) {
    var key = String(values[r][0]).toLowerCase()
    out[key] = {}
    for (var c = 0; c < header.length; c++) {
      if (values[r][c] === PASS) out[key][header[c]] = true
    }
  }
  return out
}

function roster_(ss) {
  var sheet = ss.getSheetByName(ROSTER)
  var out = {}
  if (!sheet) return out
  var values = sheet.getDataRange().getValues()
  for (var r = 1; r < values.length; r++) {
    if (values[r][0]) out[String(values[r][0]).trim().toLowerCase()] = values[r][1]
  }
  return out
}

function sheet_(ss, name, header) {
  var sheet = ss.getSheetByName(name)
  if (!sheet) {
    sheet = ss.insertSheet(name)
    sheet.appendRow(header)
    sheet.setFrozenRows(1)
  }
  return sheet
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
