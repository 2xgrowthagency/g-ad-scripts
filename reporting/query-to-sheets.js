/* Put Google Ads Data in Google Spreadsheet
 * -----------------------------------------
 * 
 * Script by Optmyzr.com
 *
 * v2 (20180810)
 *   - updated to newer reporting version in ads API
 *
 */
 
// Instructions: 
// You can edit the following settings
// - query: this is the AWQL query that tells AdWords what data to include. We’ve added a few sample queries in the code or you can write your own just like your write SQL.
// - spreadsheetUrl: the Url of the Google spreadsheet that this script will update.
// - tabName: the name of the sheet (tab) in the spreadsheet that should be updated.
// - reportVersion: the version of the AdWords API reports you’re using. The data available in the Ads API changes periodically so this ensures our script talks to the right version of AdWords.


var QUERIES = [{'query' : 'SELECT AdGroupId, Id, Conversions, ConversionTypeName ' +
          'FROM   KEYWORDS_PERFORMANCE_REPORT ' +
          'DURING LAST_30_DAYS',
                'spreadsheetUrl' : 'https://docs.google.com/spreadsheets/d/1dTabZAFRsguG6WQP0VofAynEcsPOtYdiktz5VSB77pw/edit#gid=0',
                'tabName' : 'Conversion Types',
                'reportVersion' : 'v201802'
               },
               {'query' : 'SELECT CampaignName, Clicks, Impressions, Cost ' +
          'FROM   CAMPAIGN_PERFORMANCE_REPORT ' +
          'WHERE  Impressions > 10 ' +
          'DURING LAST_30_DAYS',
                'spreadsheetUrl' : 'https://docs.google.com/spreadsheets/d/1dTabZAFRsguG6WQP0VofAynEcsPOtYdiktz5VSB77pw/edit#gid=0',
                'tabName' : 'Campaigns',
                'reportVersion' : 'v201802'
               }
              ];


function main() {
  for(var i in QUERIES) {
    var queryObject = QUERIES[i];
    var query = queryObject.query;
    var spreadsheetUrl = queryObject.spreadsheetUrl;
    var tabName = queryObject.tabName;
    var reportVersion = queryObject.reportVersion;
    //Logger.log(spreadsheetUrl + " " + query);
    var spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
    var sheet = spreadsheet.getSheetByName(tabName);
    var report = AdWordsApp.report(query, {apiVersion: reportVersion});
    report.exportToSheet(sheet);
  }
}