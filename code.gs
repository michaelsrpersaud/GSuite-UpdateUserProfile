
function update_user_profile() {
  try {
    
    var sourceSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    var lastSourceRow = sourceSheet.getLastRow();
    var lastSourceCol = sourceSheet.getLastColumn();

    var sourceRange = sourceSheet.getRange(2, 1, lastSourceRow-1, lastSourceCol-1);
    var sourceData = sourceRange.getValues();

    var activeRow = 0;

    //Loop through every retrieved row from the Source
    for (row in sourceData) {

      var userPrimaryEmail = sourceData[row][0];
      var phoneValue = sourceData[row][1];
      var jobtitle = sourceData[row][2]

      var user = AdminDirectory.Users.get(userPrimaryEmail);
      // Logger.log('User data:\n %s', JSON.stringify(user, null, 2));

      // blank out the phones
      user.phones = [];
      user.phones.push(
        {
          value: phoneValue,
          type: "mobile" // Could be 'home' or 'work' etc
        }
      )

      // remove title
      user.organizations[0].title =[];

      // add the new title
      user.organizations[0].title =jobtitle;

      // push update
      AdminDirectory.Users.update(user, userPrimaryEmail);
      Logger.log('User update complete for: ',  userPrimaryEmail );

    }

  }
  catch (err) {
    Logger.log('ERROR: ',  err );
  }


}
