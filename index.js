function pushToBugify() {
    var row = SpreadsheetApp.getActiveRange().getRow()
    var subject = SpreadsheetApp.getActiveSheet().getRange(row,4).getValue();
    var issueId = SpreadsheetApp.getActiveSheet().getRange(row,3).getValue().replace('#','');
    var description = SpreadsheetApp.getActiveSheet().getRange(row,5).getValue();
    if(!issueId){
        var data = {subject: subject, description: description, project: 3}
        var response = UrlFetchApp.fetch('http://support.website.com/api/issues.json?api_key=API_TOKEN', {method: 'post', payload: data});
        var response = JSON.parse(response.getContentText());
        var issueId = response.issue_id;
        SpreadsheetApp.getActiveSheet().getRange(row,3).setValue('=HYPERLINK("http://support.website.com/issues/'+ issueId +'";"#'+ issueId +'")')
        SpreadsheetApp.getUi().alert('Ticket has been sent on support');
    } else {
        var data = 'method=update&issue[description]='+ description +'&issue[subject]='+ subject
        var response = UrlFetchApp.fetch('http://support.website.com/api/issues/'+ issueId +'.json?api_key=API_TOKEN', {method: 'post', payload: data});
        var response = JSON.parse(response.getContentText());
        SpreadsheetApp.getUi().alert('Informations updated');
    }
}

function onOpen() {
    var menuItems = [];
    menuItems.push({name: "Send this task", functionName: "pushToBugify"});
    SpreadsheetApp.getActiveSpreadsheet().addMenu("Support", menuItems);
}