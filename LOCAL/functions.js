//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//
// - GSD NBOSS/Angora SCRIPT -
// 
// INDEX:
//		1 - guiColors ----------------> Applies the GUI colors configured in the PM.
//		2 - mwDefaultHide ------------> Hides by default the unused My-Work view panels.
//		3 - mwColors -----------------> Applies the My-Work view colors configured in the PM.
//		4 - mwTeamOrder --------------> Applies the My-Work view teams order in the "Needing Attention" panel.
//		5 - tkScrollToActions --------> Enables the scroll to actions panel snippet if selected in the PM.
//		6 - tkColors -----------------> Applies the Tickets view colors configured in the PM.
//		7 - tkTemplates --------------> Applies the Tickets view text templates configured in the PM.
//		8 - tkSetPendingEverywhere ------> Snippet to set pending the tasks
//		9 - tkUncheckPublish ------------> Snippet to uncheck the box to publish an update (it's checked by default)
//		10 - tkHighlights ---------------> Highlights in tickets for customer in special status
//		11 - tkReleasePrevent -----------> Runbook overlay. It doens't allow to release the ticket without following the runbook first
//		12 - tkRemoveToggle() -----------> Remove "Key to Highlight" section.
//		13 - tkTeamsListOrder() ---------> reorder dropdown list for team selector
//		14 - tkAttToLogs ----------------> Snippet to apply link attachements into the logs
//		15 - tkShowOwner ----------------> Shows who has the task's ownership
//		16 - tkAttMailTemp --------------> 
//		17 - tkEmailCollapser -----------> Collapse e-mails in the work logs leaving the rellevant information
//		18 - tkCPEossInfo ---------------> Snippet to show the cpe's information
//		19 - tkCreateMaint --------------> Makes easier to create maintenance tickets 
//		20 - tkHideUnpublished ----------> Snippet for hiding unpublished updates in the tickets
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~= GENERIC REUSABLE FUNCTIONS =~=~=~=~=~=~=~=~=~=~=~=~=~=//
//		21 - setAttributes --------------> add multiple attributes at once
//		22 - newButton ------------------> creates a button with a predefined style
//		23 - getTicketNr ----------------> function to retrieve the current open ticket number
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~==~=~=~=~=~=~=~=~=~=~=~=~=~=//
//		24 - alColors -------------------> appies color changes to alerts
//		25 - alView ---------------------> change style of alerts page
//		26 - alHighlights ---------------> adds hilights to some alerts
//		27 - alTicketSearch -------------> search tickets for the systems/services related to the alert
//		28 - alURLS ---------------------> Alert runbooks hyperlinks are clickable.
//		29 - ncChange ------------------->
//		30 - ncOwnershipAll -------------> Snippet that shows a button to take the ownershp of all the alerts
//		31 - ncAlertsBgColorCountdown ---> Snippet to apply background color changes in alerts
//		32 - santenScript ---------------> Loads the Santen Script as it currently is. ******** DISABLED ********
//		33 - tkAutoRedirOwnership -------> Snippet that release the ticket after redirecting the ticket
//		34 - tkAlwaysViewAll ------------> This function automates the task of opening a ticket in the "view all" view
//		35 - tkHideRetest ---------------> Hides the retest button for some types/conditions alerts
//		36 - tkitOPScreate --------------> adds a template in the ticket creation view for CTIs IT Ops - Support - Password Reset, Account unlock or Encryption
//		37 - tkCreateNote ---------------> This function creates a link to the "create note" in the task view normally available only from ticket view
//		38 - tkNoteURLS -----------------> Makes hyperlinks in notes clickable, if snippet is on
//		39 - tkCustomerWarning ----------> displays an alert, when creating the ticket, if the customer of the ticket has special procedures/requirements
//		40 - tkHighlightSupportNotes ----> This function is intendend to highlight all kind of support notes in both, view tickets and view tasks.
//		41 - tkConfirmUnresolvedClosure -> This function is intended to avoid accidental closure of ticket if it was reopened by the user
//		42 - tkHideIdentifyingData ------> This function does replace all ticket numbers with XXXXXXXXX as well as all user logs with the name
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

//if(getCookie("userid") == ""){
//	console.log("Profile is not loaded.");
//}else{
//	console.log("Profile loaded!");

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=// PROTOTYPE FUNCTIONS //=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

// Array.prototype.min = function() {
//   return Math.min.apply(null, this);
// };
// 
// // This prototype returns true if the value is in the array, else it returns false
// Array.prototype.inArray = function (value) {
// 	var i;
// 	for (i=0; i<this.length; i++) {
// 		// IMPORTANT values must be both of the same type or this will not work
// 		if (this[i] === value) {
// 			return true;
// 		}
// 	}
// 	return false;
// };
// 
// String.prototype.replace_at=function(index, replacement) {
//   return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
// };
// 
// String.prototype.splice = function(start, delCount, newSubStr) {
//   return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
// };
// 
// $.extend($.expr[':'], {
//     startsWith: function(elem,match) {  
//         return (elem.textContent || elem.innerText || "").indexOf(match[3]) == 0;
//     }  
// });

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function guiColors(){
		
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function mwDefaultHide(){
    $("td.header_title:contains('Watched Tickets')").parents().eq(3).next().toggle();
    $("td.header_title:contains('Sorting')").parents().eq(3).next().toggle();
    $("td.header_title:contains('Active')").parents().eq(3).next().toggle();
    $("td.header_title:contains('On Hold')").parents().eq(3).next().toggle();
    $("td.header_title:contains('Delegated')").parents().eq(3).next().toggle();
    $("td.header_title:contains('Pending')").parents().eq(3).next().toggle();
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function mwColors(){
    for(team in team_colors){ 
         $("td.header_title:contains('Needing Attention')").parents().eq(3).next().find("td:nth-child(5):contains('"+team+"')").css("background",team_colors[team]);         
    }
    
    for(team in team_colors){ 
         $("td.header_title:contains('Tasks Owned by You')").parents().eq(3).next().find("td:nth-child(5):contains('"+team+"')").css("background",team_colors[team]);
    }
        
    for(priority in priority_colors){ 
         $("td.header_title:contains('Needing Attention')").parents().eq(3).next().find("td:nth-child(7):contains('"+priority+"')").css("background-color",priority_colors[priority]);
    }
        
    for(priority in priority_colors){ 
         $("td.header_title:contains('Tasks Owned by You')").parents().eq(3).next().find("td:nth-child(7):contains('"+priority+"')").css("background-color",priority_colors[priority]);
    }

    $("td.header_title:contains('Needing Attention')").parents().eq(3).next().find("td:nth-child(2):contains('Internal')").css("background-color","red");
		$("td.header_title:contains('Needing Attention')").parents().eq(3).next().find("td:nth-child(8):not(:contains('Never'))").css("background","#FFB3FF");
		$("td.header_title:contains('Tasks Owned by You')").parents().eq(3).next().find("td:nth-child(8):not(:contains('Never'))").css("background","#FFB3FF");

}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function mwTeamOrder(){
    table_header=$("td.header_title:contains('Needing Attention')").parents().eq(3).next().find("tr:first-child");

    $.each(team_order.reverse(), function(index, team) {
      selected_tasks_trs=$("td.header_title:contains('Needing Attention')").parents().eq(3).next().find("td:nth-child(5):contains('"+team+"')").parent();
        if(selected_tasks_trs){
          table_header.after(selected_tasks_trs)
        }
    });
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function mwOwnershipAll(snippet){
	if (snippet=="true"){
		try{ // open/Ownership feature + ticketPriorityHandling feature

			// section Team's Tasks: Needing Attention
			var	sectionNeedAtt = document.getElementsByClassName('section_content');
			for(var i = 0; i < sectionNeedAtt.length; i++){
				var b = sectionNeedAtt[i].getElementsByClassName('section_header')[0];
				if(b.innerText.match(/Team's Tasks: Needing Attention/)){
					sectionNeedAtt = sectionNeedAtt[i]
					break;
				}
			}

			// variables to use
			var tdTeam = sectionNeedAtt.querySelectorAll('tr td:nth-child(5)'),
				tempArr = [],
				teamNames = [],
				taskOpenLinks = [];

			// create html div#tasksPayAttention for tasks list and buttons
			var htmlTasksPayAttention = `
			<div id="tasksPayAttention" style="float: right;">
			
				<h1>Late Published Tasks</h1>

				<table>
					<tbody>
						<tr class="priority">
							<td>P0</td>
							<td>P1</td>
							<td>P2</td>
							<td>P3</td>
							<td>P4</td>
						</tr>
						<tr class="tasks">
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>

				<div class="P0 infoTable">
				<h2>MultiCustomer</h2>
					<table>
						<tr>
							<th>Task</th>
							<th>Team</th>
							<th>Published</th>
						</tr>
					</table>
				</div>
				<div class="P1 infoTable">
				<h2>Critical, no publish for more than <strong>2 hours</strong></h2>
					<table>
						<tr>
							<th>Task</th>
							<th>Team</th>
							<th>Published</th>
						</tr>
					</table>
				</div>
				<div class="P2 infoTable">
				<h2>High, no publish for more than <strong>4 hours</strong></h2>
					<table>
						<tr>
							<th>Task</th>
							<th>Team</th>
							<th>Published</th>
						</tr>
					</table>
				</div>
				<div class="P3 infoTable">
				<h2>Medium, no publish for more than <strong>6 hours</strong></h2>
					<table>
						<tr>
							<th>Task</th>
							<th>Team</th>
							<th>Published</th>
						</tr>
					</table>
				</div>
				<div class="P4 infoTable">
				<h2>Low, no publish for more than <strong>12 hours</strong></h2>
					<table>
						<tr>
							<th>Task</th>
							<th>Team</th>
							<th>Published</th>
						</tr>
					</table>
				</div>
			</div>
			`;
			// push htmlTasksPayAttention in header Team's Tasks: Needing Attention
			sectionNeedAtt.querySelectorAll('td:nth-child(1)')[0].insertAdjacentHTML('beforeend', htmlTasksPayAttention);
			// push inline style
			var htmlTasksPayAttention_css = `<style>

				#tasksPayAttention {}
				#tasksPayAttention > h1{padding: 0; margin: -16px 0; font-size: 13px; position: absolute; width: 210px; text-align: center; background-color: #dac9b7;}
				#tasksPayAttention h2{padding: 0; margin: 0; font-size: 13px; text-align: center; background-color: #fff;}

				#tasksPayAttention table {border-collapse: collapse;text-align: center;}
				#tasksPayAttention .priority > td, #tasksPayAttention .tasks > td {border: 1px solid #8c6c4b;padding: 3px 13px;}
				#tasksPayAttention .tasks > td {cursor: pointer;}
				#tasksPayAttention > .infoTable{position: absolute; width: 450px; background-color: grey; margin-top: -1px;}

				#tasksPayAttention > .P0{margin-left: -407px;display: none; border: 3px solid #F0F;}
				#tasksPayAttention > .P0 th {background-color:#F0F;}
				#tasksPayAttention > .P1{margin-left: -366px;display: none;	border: 3px solid #C40000;}
				#tasksPayAttention > .P1 th {background-color:#C40000;}
				#tasksPayAttention > .P2{margin-left: -323px;display: none;	border: 3px solid #f00;}
				#tasksPayAttention > .P2 th {background-color:#f00;}
				#tasksPayAttention > .P3{margin-left: -281px;display: none;	border: 3px solid orange;}
				#tasksPayAttention > .P3 th {background-color:orange;}
				#tasksPayAttention > .P4{margin-left: -240px;display: none;	border: 3px solid yellow;}
				#tasksPayAttention > .P4 th {background-color:yellow;}

				#tasksPayAttention table tr {border-bottom: 1px solid #e3e3e3;}
				#tasksPayAttention table tr:nth-child(odd){background-color: #f5f5f5;}
				#tasksPayAttention table tr:nth-child(even){background-color: white;}

				</style>
			`;
			document.head.insertAdjacentHTML('beforeend', htmlTasksPayAttention_css);

			// create html div#queuesList for tasks list and buttons
			var htmlButtons = `
			<div id='queuesList'>
				<select>
				</select>
				<button class='openTasks' style='width: 100px;'>Open</button>
				<button class='ownershipTasks' style='background-color:red; width: 100px;'>Ownership</button>
				<span class='ownershipTimer'></span>
			</div>
			`;
			// push htmlButtons in header Team's Tasks: Needing Attention
			sectionNeedAtt.querySelectorAll('td:nth-child(1)')[0].insertAdjacentHTML('beforeend', htmlButtons);

			// push Team column text into tdTeam
			for(var aa = 0; aa < tdTeam.length; aa++) {
				tempArr.push(tdTeam[aa].innerText);
			}
			tempArr.sort();

			// remove duplicates and push values to new teamNames
			for(var bb = 0; bb < tempArr.length; bb++) {
				if(tempArr[bb] !== tempArr[bb + 1]) {
					teamNames.push(tempArr[bb]);
				}
			}

			// find task <a> and push it to taskOpenLinks 
			for(var dd = 0; dd < teamNames.length; dd++) {
				taskOpenLinks.push($('.section_content:contains("Team\'s Tasks: Needing Attention")').find('tr:contains(' + teamNames[dd] + ')').find('a:contains("TK-EU-"), a:contains("TK-JP-"), '));
			}
			// magic bug, remove last bugged index for Network Services
			for(let dd = 0; dd < teamNames.length; dd++){
				if(teamNames[dd] === 'GSD Network Services'){
					taskOpenLinks[dd].splice(-1,1);
				}
			}
			// get href attribute
			for(var gg = 0; gg < taskOpenLinks.length; gg++) { 
				for(var jj = 0; jj < taskOpenLinks[gg].length; jj++){
					taskOpenLinks[gg][jj] = taskOpenLinks[gg][jj].getAttribute('href');
				}
			};

			// add <option> to div#queuesList with correct [total tasks number] team name
			for(var cc = 0; cc < teamNames.length; cc++) {
				document.querySelector('#queuesList select').insertAdjacentHTML('beforeend', '<option>[ ' + taskOpenLinks[cc].length + ' ] ' + teamNames[cc] + '</option>');
			}

			// function to open tasks in new tab
			// angora-op-gui-eu?action=view-tasks&id=1725181
			function openTasksByTeam(team) {
				for(var ee = 0; ee < team.length; ee++) { window.open(team[ee]) };
			}
			// on click openTasks button opens new tabs with tasks
			document.getElementsByClassName('openTasks')[0].addEventListener('click', function(e){
				e.preventDefault();
				for(var ff = 0; ff < taskOpenLinks.length; ff++) {
					if(document.querySelectorAll('#queuesList > select > option')[ff].selected) {
						openTasksByTeam(taskOpenLinks[ff]);
					}
				}
			});

			// ######################################################################################################
			// Ownership button
			// ######################################################################################################
			// variables to use
			var taskOwnershipLinks = [],
				startStop = true,
				ownershipTimer,
				notification,
				queuesListSpan = document.querySelector('#queuesList > .ownershipTimer'),
				counter = 3;

			// copy values from taskOpenLinks to taskOwnershipLinks 
			taskOwnershipLinks = JSON.parse(JSON.stringify(taskOpenLinks));

			// change action from view-tasks to take-ownership
			for(var hh = 0; hh < taskOwnershipLinks.length; hh++){
				for(var ll = 0; ll < taskOwnershipLinks[hh].length; ll++){
					var ee = taskOwnershipLinks[hh][ll];
					var tt = ee.replace('action=view-tasks', 'action=take-ownership');
					taskOwnershipLinks[hh][ll] = tt;
				}
			}

			// on click "Ownership" button open new tabs with ownership
			document.getElementsByClassName('ownershipTasks')[0].addEventListener('click', function(e){
				e.preventDefault();

				var _self = this;

				// on first click
				if(startStop){

					_self.innerText = 'Stop';
					queuesListSpan.innerText = 'Ownership in : ' + counter + ' seconds.';

					notification = setInterval(function(){
						console.log('Ownership tickets');
						queuesListSpan.innerText = 'Ownership in : ' + (counter = counter-1) + ' seconds.';
					}, 1e3);

					setTimeout(function(){
						clearInterval(notification);
						_self.innerText = 'Ownership';
					}, 3e3);

					ownershipTimer = setTimeout(function(){
						for(var kk = 0; kk < taskOwnershipLinks.length; kk++) {
							if(document.querySelectorAll('#queuesList > select > option')[kk].selected) {
								openTasksByTeam(taskOwnershipLinks[kk]);
							}
						}
						queuesListSpan.innerText = '';
					}, 3e3);

					startStop = false;

				// on second click
				}else{

					_self.innerText = 'Ownership';

					clearInterval(ownershipTimer);
					clearInterval(notification);

					startStop = true;
					counter = 3;
					queuesListSpan.innerText = '';
					
				}

			});
			
		}catch(e){
			console.log('ERROR: Open/Ownership tasks buttons failed');
		}
	}

}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function mwTest(){
		//nobss url
		//$("#profileDIV").load( "https://nexus.ntteo.net/angora-op-gui-eu?action=view-tasks&id=1717000 tr td:last-child:contains('Team :'):first a:last-child",function(){
		//$("#profileDIV").load( "https://nboss.ntt.eu/angora-op-gui-eu?action=view-tasks&id=1717000 tr td:last-child:contains('Team :'):first a:last-child",function(){
		$("#profileDIV").load( "https://eu-nboss.nttltd.global.ntt/angora-op-gui-eu?action=view-tasks&id=1717000 tr td:last-child:contains('Team :'):first a:last-child",function(){
			var textTest = $("#profileDIV").text();
			console.log(textTest);
		});
	
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

/* Removing the Scroll To Actions Panel until further notice - Cristiano's request

function tkScrollToActions(snippet){

	var tdActions;
	var header_title = document.getElementsByClassName('header_title');

	// find header_title which contains Actions and assign it to tdActions
	for(var i = 0; i < header_title.length; i++){
		if(header_title[i].innerText.match(/Actions/)){
			tdActions = header_title[i];
		}
	}

	// scroll down to Actions
	if ( window.location.href.indexOf("action=view-tasks") > -1 && snippet=="true" && tdActions != null ) { // != null is the same as !== null && !== undefined, double check
		window.scroll(0, tdActions.offsetParent.offsetTop);
	}
	
}

*/

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function tkColors(){
	//$("input.nexus_button[value='Force Ownership']").css("background-color","red");
		$("td.current_user_log").css("background-color","#9fc4f9");

		//put color on subtasks
		subtask_table_section = $("td.header_title:contains('Direct Subtasks')");
		//colorise task state
		if(subtask_table_section) {
			subtask_table_tr = subtask_table_section.parents().eq(3).next();
			for(state in state_colors){ 
				subtask_table_tr.find("td:first-child:contains('"+state+"')").css("background-color", state_colors[state] )
			}
		}

		// get div which contains ticket main info
		summary_trs = $("td.header_title:contains('TK-')").parents().eq(3).next();
		// get 'Urg / Imp / Pri / CTI' next td 
		ticket_urg_td=summary_trs.find("th:first-child:contains('Urg / Imp / Pri / CTI')").next();
		// get the ticket priority 
		priority = ticket_urg_td.text().split(" / ")[2].match(/\d/g).toString();
		// change background color to 'Ticket Urg / Imp / Pri / CTI' td by priority
		ticket_urg_td.prev().css("background-color", priority_colors[priority] );
		// get 'States (Ticket/Task)' next td
		state_td=summary_trs.find("th:first-child:contains('States (Ticket/Task)')").next();
		// get Open (Customer) or Internal from 'States (Ticket/Task)' td
		internalexternal = state_td.text().split(" / ")[0];
		// change background color to 'States (Ticket/Task)' next td
		state_td.prev().css("background-color", internalexternal_colors[internalexternal]);
		// get task state
		state = state_td.text().split(" / ")[1];
			// change background color to 'States (Ticket/Task)' next td
		state_td.css("background-color", state_colors[state]); 
		// get 'Ticket / Parent' next td
		ticket_parent_td=summary_trs.find("th:first-child:contains('Ticket / Parent')").next();
		if (ticket_parent_td.length > 0) {
			// get published state 
			published_state = ticket_parent_td.text().match(/\(Published: (.*)\)/)[1];
			// change background color to 'Ticket / Parent' next td
			ticket_parent_td.css("background-color",  (published_state_colors[published_state] || "") );
		}
        
        // add style to tds on view-tasks page
		$("td:contains('Outbound Call')").css({ "background-color": "#AAE5ED", "font-size": "14px" });
		$("td:contains('Outbound Call')").next().css({ "background-color": "#AAE5ED", "font-size": "14px" });
		$("td:contains('Outbound Mail')").css({ "background-color": "#AAE5ED", "font-size": "14px" });
		$("td:contains('Outbound Mail')").next().css({ "background-color": "#AAE5ED", "font-size": "14px" });
		$("td:contains('Inbound Call')").css({ "background-color": "#CCFED0", "font-size": "14px" });
		$("td:contains('Inbound Call')").next().css({ "background-color": "#CCFED0", "font-size": "14px" });
		$("td:contains('Inbound Mail')").css({ "background-color": "#CCFED0", "font-size": "14px" });
		$("td:contains('Inbound Mail')").next().css({ "background-color": "#CCFED0", "font-size": "14px" });


		//Ticket Note section color
		$("div.section_header:has(td:contains('Ticket Note'))").next().find('*').css("background","#00FFD5");
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function tkTemplates(){

	// Add default time spent everywhere
	$("input[name*='spent']").val(default_time_spent);
	// Check continue work
	$("input[name='dbfield:4:__raw_custom__:__single__:log_work_continue_work:newval']").attr('checked', true);

	// delegates
	var summary_trs = $("td.header_title:contains('TK-')").parents().eq(3).next();
	var subtask_summary = summary_trs.find("th:first-child:contains('Task Summary')").next().text();
	$("input[name='dbfield:3:__raw_custom__:__single__:delegate_summary']").val(subtask_summary);
	// set delegation details text
	$("textarea[name='dbfield:3:__raw_custom__:__single__:delegate_details']").val(delegate_template);
	// set delegate customer update  
	$("textarea[name='dbfield:3:__raw_custom__:__single__:delegate_customer_update']").val(delegate_customer_template);
	// Uncheck Skip Customer Update
	$("input[name='dbfield:4:__raw_custom__:__single__:delegate_skip_update:newval']").attr('checked',false);

	// set redirect reason
	$("textarea[name='dbfield:3:__raw_custom__:__single__:redirect_reason']").val(redirect_template);

	// set pending
	$("textarea[name='dbfield:3:__raw_custom__:__single__:set_pending_reason']").val(pending_template);

	// set assign reason  
	$("textarea[name='dbfield:3:__raw_custom__:__single__:assign_reason']").val(assign_template);
	
	// set more info reason  
	$("textarea[name='dbfield:3:__raw_custom__:__single__:more_info_question']").val(moreinfo_template);

				
	// set hold reason  
	$("textarea[name='dbfield:3:__raw_custom__:__single__:on_hold_reason']").val(onhold_template);
	// set hold customer update  
	$("textarea[name='dbfield:3:__raw_custom__:__single__:on_hold_customer_update']").val(onhold_customer_template);

	// 3rd party email
	subject_line = summary_trs.find("th:first-child:contains('Task Summary')").next().text();
	$("input[name='dbfield:3:__raw_custom__:__single__:subject']").val(subject_line);
	// set email details text
	$("textarea[name='dbfield:3:__raw_custom__:__single__:email_details']").val(email_template);
	// Tab "Ask Question"
	// default question
	$("textarea[name='dbfield:3:__raw_custom__:__single__:ask_question_question']").val(ask_question_template);
	// Tab "Log Work"
	$("textarea[name='dbfield:3:__raw_custom__:__single__:log_work_work_log']").text(signature_template);

	// Add a template for phone calls.
	$("select[name='dbfield:3:__raw_custom__:__single__:log_work_type']").change(function(){

			var switcherVal = $("select[name='dbfield:3:__raw_custom__:__single__:log_work_type']").val();

			switch (switcherVal){
					case "1":
							$("textarea[name='dbfield:3:__raw_custom__:__single__:log_work_work_log']").text(signature_template); //change the textbox
						break;

					case "5":
					case "6":
							$("textarea[name='dbfield:3:__raw_custom__:__single__:log_work_work_log']").text(call_template); //change the textbox
						break;

					case "14":
							$("textarea[name='dbfield:3:__raw_custom__:__single__:log_work_work_log']").text(moreinfo_template); //change the textbox
						break;
			}

		});


	//Task Closure
	$("textarea[name='dbfield:3:__raw_custom__:__single__:complete_task_comment']").val(complete_template);

//-------------------------------------------------------------

	// change text in .remote-oss-message in case link 'GSD for ECL1.0 B-End Infra Provider' exists
	//if ($(".remote-oss-message").length && $("a:contains('GSD for ECL1.0 B-End Infra Provider')").length) {
	//	//change height and width for yellow block
	//	$(".remote-oss-message > p:nth-child(1)").css({"height":"432px"});
	//	$(".remote-oss-message").css({"width":"85%"});
	//	//add specific text
	//	//retext = "<div id='addText' style='text-align: left'><br/><span>This ticket has been escalated to us for another Service Provider (Customer Front)</span><div style='width: 20%;margin-left: 32%'>*****************************************************************<h3 style='width: 100%;margin-left: 40%;margin-top: 0;margin-bottom: 5px'>DO NOT PUBLIC UPDATE</h3>*****************************************************************</div>Phase 1: Collect information<br/><br/>Before start the investigation be sure that you have all the details, if not, use \'more info\' the below template to get all the information (ALWAYS INTERNAL) from the A-END:<br/><br/>&nbsp&nbsp&nbsp&nbspImpact/Issue overview:<br/>&nbsp&nbsp&nbsp&nbspWhen:<br/>&nbsp&nbsp&nbsp&nbspWhere (DC):<br/>&nbsp&nbsp&nbsp&nbsp\'VirtualRoom\' or \'GCV Service\' affected:<br/>&nbsp&nbsp&nbsp&nbspSystems and nicknames affected:<br/><br/>Phase 2: Triage<br/><br/>&nbsp&nbsp&nbsp&nbspCheck if there is a major outage related to EC on going.<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspIn that case inform A-end (ALWAYS INTERNAL)<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspInclude this ticket into the internal MI ticket<br/>&nbsp&nbsp&nbsp&nbspCheck if there are recently open (24-48 hours) alert tickets Priority 1 or 2 in the customer <a href='https://nexus.ntteo.net/angora-op-gui-eu?action=view-customers.ticketing&id=2892&block=3:7f' target='_blank'>NTT Enterprise Cloud (Europe) - Support Tab</a> related to the DC (UK, FR, ES, DE).<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspIn that case inform A-end (ALWAYS INTERNAL)<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspDelegate a task to the right Engineering Team adding the ticket to confirm that is related.<br/><br/>&nbsp&nbsp&nbsp&nbspIf no tickets related or outage, please delegate a subtask to the right Engineering Team, advising them to keep the updates internal in their subtask.<br/><br/>Confluence page: <a href='https://confluence.ntt.eu/x/a5-dH' target='_blank'>Procedure</a></div>";
	//	retext = "<div id='addText' style='text-align: left'><br/><span>This ticket has been escalated to us for another Service Provider (Customer Front)</span><div style='width: 20%;margin-left: 32%'>*****************************************************************<h3 style='width: 100%;margin-left: 40%;margin-top: 0;margin-bottom: 5px'>DO NOT PUBLIC UPDATE</h3>*****************************************************************</div>Phase 1: Collect information<br/><br/>Before start the investigation be sure that you have all the details, if not, use \'more info\' the below template to get all the information (ALWAYS INTERNAL) from the A-END:<br/><br/>&nbsp&nbsp&nbsp&nbspImpact/Issue overview:<br/>&nbsp&nbsp&nbsp&nbspWhen:<br/>&nbsp&nbsp&nbsp&nbspWhere (DC):<br/>&nbsp&nbsp&nbsp&nbsp\'VirtualRoom\' or \'GCV Service\' affected:<br/>&nbsp&nbsp&nbsp&nbspSystems and nicknames affected:<br/><br/>Phase 2: Triage<br/><br/>&nbsp&nbsp&nbsp&nbspCheck if there is a major outage related to EC on going.<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspIn that case inform A-end (ALWAYS INTERNAL)<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspInclude this ticket into the internal MI ticket<br/>&nbsp&nbsp&nbsp&nbspCheck if there are recently open (24-48 hours) alert tickets Priority 1 or 2 in the customer <a href='https://nboss.ntt.eu/angora-op-gui-eu?action=view-customers.ticketing&id=2892&block=3:7f' target='_blank'>NTT Enterprise Cloud (Europe) - Support Tab</a> related to the DC (UK, FR, ES, DE).<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspIn that case inform A-end (ALWAYS INTERNAL)<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspDelegate a task to the right Engineering Team adding the ticket to confirm that is related.<br/><br/>&nbsp&nbsp&nbsp&nbspIf no tickets related or outage, please delegate a subtask to the right Engineering Team, advising them to keep the updates internal in their subtask.<br/><br/>Confluence page: <a href='https://confluence.ntt.eu/x/a5-dH' target='_blank'>Procedure</a></div>";
	//	$(".remote-oss-message > p:nth-child(1)").append(retext);
	//}
//-------------------------------------------------------------

		if($(".remote-oss-message").length&&$("td a:contains('Netmagic Monitoring Team')").length){var ECWarn=document.createElement("P");ECWarn.innerHTML="If this tak is about an EC incident, inform affected customers following: <a href='https://nttisc.atlassian.net/wiki/x/KA2c' target='_blank'>Handling Enterprise Cloud Infrastructure Incidents</a>",ECWarn.id="EcWarnid",$(".header_title:contains('Actions')").parent().parent().parent().parent().parent().prepend(ECWarn),$("#EcWarnid").css({width:"100%","line-height":"30px",height:"30px","text-align":"center","vertical-align":"middle",color:"black","background-color":"orange","font-weight":"bold"})
		}

//-------------------------------------------------------------
	
	if($("th:contains('Urg / Imp / Pri / CTI')").next().text().indexOf("0 - Critical Multiple") > -1){
	    
	    var p0Text = "Dear team,\n\nWe are delegating you a P0 task regarding:\n\n>> DELEGATION DETAILS <<\n\nOn resolution, before closing your task, please, let us have the following details:\n\nRelevant Information?\n-Summary or details you consider relevant to report the incident.\n\nCustomer Impact?\n-YES or NO\n\nThanks a lot for your kind cooperation in advance.";
	    
	    $("textarea[name='dbfield:3:__raw_custom__:__single__:delegate_details']").val(p0Text);
	    
	}	

}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function tkSetPendingEverywhere(snippet){
		if (snippet=="true"){
			$("input[name*='pending']" ).attr('checked', true);
			//The following line forces the script to always keep unselected the "CR" pending tick box. Otherwise, tickets go pending after drafting a CR (annoying).
			$("input[name*='dbfield:4:__raw_custom__:__single__:change_request_set_pending:newval']" ).attr('checked', false);
		}	else {
			$("input[name*='pending']" ).attr('checked', false);
		}
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function tkUncheckPublish(snippet){
		if (snippet=="true"){
			$("input[name*='publish']").attr('checked', false);
		}
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function tkHighlights(){
			//NTTCOM MS Service Now
			$("div.section_header:has(td:contains('Partner Support Notes'))").next().find("td:contains('NTTCOM MS Service NOW')").css("background","#FFA500");

			//Umicore
			if($("td a:contains('Dimension Data Belgium [Umicore]'):first").parent().prev().text()=="Related"){
			    var umicoreWarning=document.createElement("P");
			    umicoreWarning.innerHTML="If ticket is opened from the customer, follow system support notes. If ticket was created from alert(s), follow the runbook.";
			    umicoreWarning.id="umiWarn";
			    
			    // prepend created element to Actions
			    //$(".header_title:contains('Actions')").parent().parent().parent().parent().parent().prepend(umicoreWarning);
			    $("#work-log").prepend(umicoreWarning);
			    $("#umiWarn").css({"width":"100%","line-height":"35px","height":"35px","text-align":"center","vertical-align":"middle","color":"white","background-color":"black","font-weight":"bold"});
			}

			//Hennes & Mauritz
			if($("td a:contains('H & M HENNES & MAURITZ PORTAL'):first").parent().prev().text()=="Related"){

				// create p element, add content and assign an id 
				var hmHennesWarning=document.createElement("P");
				hmHennesWarning.innerHTML="For this customer, follow  Configuration Item Support Notes above. More info in <a class='warningLinks' href='https://nttisc.atlassian.net/wiki/x/6Qyc' target='_blank'>Confluence</a>";
				hmHennesWarning.id="hmHennesWarn";

				// prepend created element to Actions
				//$(".header_title:contains('Actions')").parent().parent().parent().parent().parent().prepend(hmHennesWarning);
				$("#work-log").prepend(hmHennesWarning);
				$("#hmHennesWarn").css({"width":"100%","line-height":"30px","height":"30px","text-align":"center","vertical-align":"middle","color":"white","background-color":"black","font-weight":"bold"});
			}
			//Decathlon (OSMOSE)
			if($("td a:contains('DECATHLON OSMOSE'):first").parent().prev().text()=="Related"){

				// create p element, add content and assign an id 
				var DecathlonOsmoWarning=document.createElement("P");
				DecathlonOsmoWarning.innerHTML="This customer has been declared in special status. Please, follow the process indicated here: <a href='https://nttisc.atlassian.net/wiki/x/wQ2c' target='_blank'><span style='color: orange !important;'>Confluence</span></a>";
				DecathlonOsmoWarning.id="DecathlonOsmoWarn";

				// prepend created element to Actions
				//$(".header_title:contains('Actions')").parent().parent().parent().parent().parent().prepend(DecathlonOsmoWarning);
				$("#work-log").prepend(DecathlonOsmoWarning);
				$("#DecathlonOsmoWarn").css({"width":"100%","line-height":"30px","height":"30px","text-align":"center","vertical-align":"middle","color":"white","background-color":"black","font-weight":"bold"});
			}
			//Decathlon (CUBE)
			if($("td a:contains('DECATHLON CUBE EU'):first").parent().prev().text()=="Related"){

				// create p element, add content and assign an id 
				var DecathlonCubeWarning=document.createElement("P");
				DecathlonCubeWarning.innerHTML="This customer has been declared in special status. Please, follow the process indicated here: <a href='https://nttisc.atlassian.net/wiki/x/wQ2c' target='_blank'><span style='color: orange !important;'>Confluence</span></a>";
				DecathlonCubeWarning.id="DecathlonCubeWarn";

				// prepend created element to Actions
				//$(".header_title:contains('Actions')").parent().parent().parent().parent().parent().prepend(DecathlonCubeWarning);
				$("#work-log").prepend(DecathlonCubeWarning);
				$("#DecathlonCubeWarn").css({"width":"100%","line-height":"30px","height":"30px","text-align":"center","vertical-align":"middle","color":"white","background-color":"black","font-weight":"bold"});
			}
			
			//Netbackup Alerts
// 			if($("td:contains('Backup Alerts')").parent().prev().text=="Ticket Summary"){

// 				// create p element, add content and assign an id 
// 				var NetbackupAlert=document.createElement("P");
// 				NetbackupAlert.innerHTML="This is a Netbackup case. Please, follow the process indicated here: <a href='https://nttisc.atlassian.net/wiki/spaces/SERVICEDESK/pages/10225991/Basic+Concepts+of+Netbackup#BasicConceptsofNetbackup-Troubleshooting' target='_blank'><span style='color: red !important;'>ERROR BBDD CONFLUENCE</span></a>";
// 				NetbackupAlert.id="NetbackupA";

// 				// prepend created element to Actions
// 				//$(".header_title:contains('Actions')").parent().parent().parent().parent().parent().prepend(NetbackupAlert);
// 				$("#work-log").prepend(NetbackupAlert);
// 				$("#NetbackupA").css({"width":"100%","line-height":"30px","height":"30px","text-align":"center","vertical-align":"middle","color":"black","background-color":"#00BFFF","font-weight":"bold"});
// 			}
            if($("td:contains('Backup Alerts'):first").parent().text()){
                var NetbackupAlert=document.createElement("P");
                NetbackupAlert.innerHTML="This is a Netbackup case. Please, follow the process indicated here: <a href='https://nttisc.atlassian.net/wiki/spaces/SERVICEDESK/pages/10225991/Basic+Concepts+of+Netbackup#BasicConceptsofNetbackup-Troubleshooting' target='_blank'><span style='color: red !important;'>ERROR BBDD CONFLUENCE</span></a>";
                NetbackupAlert.id="NetbackupA";
        
        
                // prepend created element to Actions
                //$(".header_title:contains('Actions')").parent().parent().parent().parent().parent().prepend(NetbackupAlert);
                $("#work-log").prepend(NetbackupAlert);
                $("#NetbackupA").css({"width":"100%","line-height":"30px","height":"30px","text-align":"center","vertical-align":"middle","color":"black","background-color":"#00BFFF","font-weight":"bold"});
            }
			
			//Tremco
			/*if($("td a:contains('tremco illbruck Group GmbH (RPM Building Solutions Europe)'):first").parent().prev().text()=="Related"){

				// create p element, add content and assign an id 
				var TremcoWarning=document.createElement("P");
				TremcoWarning.innerHTML="This customer has been declared in special status. Please, follow the process indicated here: <a href='https://nttisc.atlassian.net/wiki/x/wQ2c' target='_blank'><span style='color: orange !important;'>Confluence</span></a>";
				TremcoWarning.id="TremcoWarn";

				// prepend created element to Actions
				//$(".header_title:contains('Actions')").parent().parent().parent().parent().parent().prepend(TremcoWarning);
				$("#work-log").prepend(TremcoWarning);
				$("#TremcoWarn").css({"width":"100%","line-height":"30px","height":"30px","text-align":"center","vertical-align":"middle","color":"white","background-color":"black","font-weight":"bold"});
			}*/
			
			// AVIVA
			/*if($("td a:contains('Aviva Central Services UK Limited - SHARED PLATFORM'):first").parent().prev().text()=="Related"){

                // create p element, add content and assign an idÂ 

                var AvivaWarning=document.createElement("P");

                AvivaWarning.innerHTML="This customer has been declared in special status. Please, follow the process indicated here: <a href='https://nttisc.atlassian.net/wiki/x/wQ2c' target='_blank'><span style='color: orange !important;'>Confluence</span></a>";

                AvivaWarning.id="AvivaWarn";


                // prepend created element to Actions

                //$(".header_title:contains('Actions')").parent().parent().parent().parent().parent().prepend(AvivaWarning);

                $("#work-log").prepend(AvivaWarning);

                $("#AvivaWarn").css({"width":"100%","line-height":"30px","height":"30px","text-align":"center","vertical-align":"middle","color":"white","background-color":"black","font-weight":"bold"});

            }*/
			
/*			//AICPA (cima)
			if($("td a:contains('AICPA(cima)'):first").parent().prev().text()=="Related"){

				// create p element, add content and assign an id 
				var CimaWarning=document.createElement("P");
				CimaWarning.innerHTML="This customer has been declared in special status. Please, follow the process indicated here: <a href='https://nttisc.atlassian.net/wiki/x/wQ2c' target='_blank'><span style='color: orange !important;'>Confluence</span></a>";
				CimaWarning.id="CimaWarn";

				// prepend created element to Actions
				//$(".header_title:contains('Actions')").parent().parent().parent().parent().parent().prepend(TremcoWarning);
				$("#work-log").prepend(CimaWarning);
				$("#CimaWarn").css({"width":"100%","line-height":"30px","height":"30px","text-align":"center","vertical-align":"middle","color":"white","background-color":"black","font-weight":"bold"});
			}*/

            if($("td a:contains('Customer Portal'):first").parent().prev().text()=="Ticket Urg / Imp / Pri / CTI"){
            	var CPWarn=document.createElement("DIV");CPWarn.innerHTML="<p>This is a Customer Portal Ticket â€“ DO NOT action any technical requests related to the customerâ€™s platform/managed services. This Ticket category is meant solely for requests/issues related to the NTTE Customer Portal.</br>Refer to the<a href='https://confluence.ntt.eu/display/SERVICEDESK/Customer+Portal+2.0#CustomerPortal2.0-SupportProcess'>Support Process</a> in order to support customers that raise valid questions/issues related to the Customer Portal (both â€œoldâ€ and â€œnewâ€ portal)</br>and delegate a task to the <b>Customer Portal Support team / OSS</b> queue after gathering the required info, if you are unable to resolve the inquiry yourself.</p>";
            	CPWarn.id="CPWarnid";
            	
            	//$(".header_title:contains('Actions')").parent().parent().parent().parent().parent().prepend(CPWarn);
            	$("#work-log").prepend(CPWarn);
            	$("#CPWarnid").css({width:"100%","line-height":"30px","text-align":"center","vertical-align":"middle",color:"black","background-color":"orange","font-weight":"bold"});
            	$(".header_title").each(function(){
            		if($(this).is(":contains('Customer Support Notes')") || $(this).is(":contains('Work Log')") || $(this).is(":contains('Actions')") || $(this).is(":contains('TK-EU-')")){
            			if($(this).find(".header_plus").css("display")=="inline"){
            				$(this).find(".header_toggle").click();
            			}
            		}else{
            			if($(this).find(".header_minus").css("display")=="inline"){
            				$(this).find(".header_toggle").click();
            			}
            		}
            		
            	})
			}
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function tkReleasePrevent(){
			//Runbook overlay --> Modify as runbook confirmation button --> click --> add update --> check update exists --> enable release ownership

			//Critical NS tickets.
			var preventRelease = true;

			if(($("td a:contains('GSD Network Services'):first").parent().prev().text()=="Ownership") && ($("td:contains('1 - Critical'):first").prev().text()=="Ticket Urg / Imp / Pri / CTI") && ($("input[value='Release Ownership']"))){			
					$("input[value='Release Ownership']").click(function(event){
							if (preventRelease==true){
								event.preventDefault();
								var choice = confirm("This ticket is CRITICAL. Be aware that you are trying to release it in the queue.\nPlease, assign it to an available colleague and get his/her acknowledge.\n\nClick OK --> To proceed and ASSIGN it.\nClick Cancel --> If you are really sure to release it. (Rare exception)");
								if (choice == false){
									preventRelease = false;
									alert("You are now able to release the ticket on your own responsability.\n\n");
								}
							}
					});
			}
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function tkRemoveToggle(){
			//Remove "Key to Highlight" section.
			$("td.header_title:contains('Key to Highlighting')").parents().eq(4).remove();

			//Collapse "External Support" div
			$("td.header_title:contains('External Support')").parents().eq(3).next().toggle();
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function tkTeamsListOrder(){

// reorder dropdown list for team selector
	selectDelegate = $("select[name='dbfield:3:__raw_custom__:__single__:delegate_team']");
	if (selectDelegate.length == 1) {		
		$.each(delegate_dropdown_list_order.slice(0).reverse(), function(index, team) {
			options = selectDelegate.find("option:contains('" + team + "')");
			selectDelegate.prepend(options);
		});
		options = selectDelegate.find("option:contains('Partner')");
		selectDelegate.prepend(options);
		selectDelegate.find("option:first").attr("selected", "selected");
	}
	
	selectRedirect = $("select[name='dbfield:3:__raw_custom__:__single__:redirect_team']");
	if (selectRedirect.length == 1) {
		$.each(redirect_dropdown_list_order.slice(0).reverse(), function(index, team) {
			options = selectRedirect.find("option:contains('" + team + "')");
			selectRedirect.prepend(options);
		});
		options = selectRedirect.find("option:contains('Partner')");
		selectRedirect.prepend(options);
		selectRedirect.find("option:first").attr("selected", "selected");
		}

	var hideOpt = selectDelegate.find("option:contains('GSD Integrated Services')");
	for (var i=0; i<hideOpt.length; i++){
		if((hideOpt[i].text.length==26) || (i==4)){
			hideOpt[i].style.display = "none";
		}
	}

	hideOpt = selectRedirect.find("option:contains('GSD Integrated Services')");
	for (var i=0; i<hideOpt.length; i++){
		if((hideOpt[i].text.length==26) || (i==4)){
			hideOpt[i].style.display = "none";
		}
	}

	if($("td a:contains('IT Operations - Support'):first").parent().prev().text()=="Ownership"){
			selectITOPS = $("select[name='dbfield:3:__raw_custom__:__single__:cti_category']");
			selectITOPS.find("option[value='20']").attr("selected", "selected").trigger('change');
	}
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function tkAttToLogs(snippet){
	if(snippet=="true"){
		$("td:startsWith('Added Attachment [')").each(function(){
			//var testVal=this.text();
			if (this.innerHTML.indexOf("Added Attachment")>-1){
				var attFile = this.innerHTML.substring(this.innerHTML.indexOf("[")+1 , this.innerHTML.indexOf("]"));
				var linkHref = $("a:contains("+attFile+")").attr("href");
				//alert(this.innerHTML +" - "+ attFile + " - " + linkHref);
				var attToLink = this.innerHTML.replace(attFile,"<a href='"+linkHref+"'>"+attFile+"</a>");
				this.innerHTML = attToLink;
			}
		});
	}
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function tkShowOwner(){
		var btnOwnership = $("input.nexus_button:first");
		var btnValue = btnOwnership.val();

		if (btnValue=="Force Ownership"){
				btnOwnership.css("background-color","red");
				
				var btnOwnership_text = btnOwnership.attr("value");
				
				var summary_trs=$("td.header_title:contains('TK-')").parents().eq(3).next();
				var ownership_td=summary_trs.find("th:first-child:contains('Ownership')").next();
				var owner=ownership_td.find("a:last-child").text();

				owner="<span>&nbsp;Owned by:&nbsp;<span style='font-weight: bold'>" + owner + "<span/>&nbsp;<span/>";
				
				btnOwnership.parent().append(owner);
		}
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function tkAttMailTemp(test){

		function checkSelItem(){
				var currentEmail = $("textarea[name='dbfield:3:__raw_custom__:__single__:email_details']").val();
				var attAdded = document.getElementById("dbfield:3:__raw_custom__:__single__:email_attachments__sel").length;

				if (attAdded > 0){
						if (currentEmail.indexOf(attWarning_template)==-1){
									currentEmail = currentEmail +"\n\n=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=\n" + attWarning_template + "\n=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=";
									$("textarea[name='dbfield:3:__raw_custom__:__single__:email_details']").val(currentEmail);
						}
				} else {
						if (currentEmail.indexOf(attWarning_template)>-1){
									currentEmail = currentEmail.slice(0,currentEmail.indexOf("\n\n=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=\n"));
									$("textarea[name='dbfield:3:__raw_custom__:__single__:email_details']").val(currentEmail);
						}
				}		
		}

		if(document.getElementById("dbfield:3:__raw_custom__:__single__:email_attachments_add_button") != null){
				document.getElementById("dbfield:3:__raw_custom__:__single__:email_attachments_add_button").addEventListener("click", checkSelItem.bind(this));
				document.getElementById("dbfield:3:__raw_custom__:__single__:email_attachments_add_button").nextSibling.nextSibling.addEventListener("click", checkSelItem.bind(this));
		}

}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~ Ticket Email Collapser ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

/**
 * @description This will collapse all inbound mail, outbound mail and portal responses. It limits the total size to 10 lines height.
 * @author Jonathan Guillen, Diego Fernandez
 * @version 2.0
 * @requires jQuery libraries
 */
function tkEmailCollapser(){
	try {
		var i=0;
		// Selects all anchors that contain these three possible words and are inside a cell
		// Selects the parent element (cell) and then select its next cell sibling
		// Creates a function for each
		$("td a:contains('Portal Response'), a:contains('Outbound Mail'), a:contains('Inbound Mail')").parent().next().each(function(){
			// This try/except should be always here as this will avoid crashes if something has been changed
			try {
				// This adds an ID to the cell if it has none
				this.id||(this.id="class1cell"+i);
				var e=this.innerHTML;
				var rest, from, to, header, subject, body;
				// If "From" does not exist it is either Outbound or Portal Response
				if (e.indexOf('From: ') == -1) {
					// If "To" does not exist, it is Portal Response
					if (e.indexOf('To: ') == -1) {
						// Get the response body without additional text/initial spaces
						from = to = header = subject = '';
						body = e.slice(e.indexOf('<br><br>') + 8);
					}
					// "To" exists, it is Outbound
					else {
						from = 'NTT';
						// Get the value of "To"
						rest = e.slice(e.indexOf('To: '));
						to = (rest.toLowerCase().indexOf('cc: ') != -1) ? rest.slice(4, rest.toLowerCase().indexOf('cc: ')) : rest.slice(4, rest.indexOf('<br>'));
						header = from + ' --> ' + to + '<br>';
						// Get the value of "Subject"
						rest = rest.slice(rest.indexOf("Subject: "));
						subject = rest.slice(9, rest.indexOf('<br>'));
						// Get the value of the message content
						rest = rest.slice(rest.indexOf('<br>') + 8);
						body = rest;
					}
				}
				// "From" exists, it is Inbound
				else {
					// Get the value of "From"
					rest = e.slice(e.indexOf('From: '));
					from = rest.slice(6, rest.indexOf('<br>'));
					// Get the value of "To"
					rest = e.slice(e.indexOf('To: '));
					to = (rest.toLowerCase().indexOf('cc: ') != -1) ? rest.slice(4, rest.toLowerCase().indexOf('cc: ')) : rest.slice(4, rest.indexOf('<br>'));
					header = from + ' --> ' + to + '<br>';
					// Get the value of "Subject"
					rest = rest.slice(rest.indexOf("Subject: "));
					subject = rest.slice(9, rest.indexOf('<br>'));
					// Get the value of the message content
					rest = rest.slice(rest.indexOf('<br>') + 8);
					body = rest;
				}

				// Empties current cell content
				this.innerHTML = '';
				// Creates a paragraph with the new text content
				var para = document.createElement('p');
				para.classList.add('email-collapsed');
				//para.classList.add('fade');
				var spacing = '<br>';
				var text = header + subject + spacing + body;
				para.innerHTML = text;
				// Create Show/Hide toggle button
				var toggleBtn = document.createElement('button');
				toggleBtn.innerText = 'Show';
				toggleBtn.addEventListener('click', function() {
					var short = text;
					var long = e;
					// Shows the long version
					if (this.innerText == 'Show') {
						this.innerText = 'Hide';
						this.nextSibling.innerHTML = long;
						para.classList.toggle('email-collapsed');
						//para.classList.adtoggled('fade');
					} 
					// Shows the short version
					else {
						this.innerText = 'Show';
						this.nextSibling.innerHTML = short;
						para.classList.toggle('email-collapsed');
						//para.classList.toggle('fade');
					}
				});
				// This adds the button as the first child of the cell
				this.append(toggleBtn);
				this.append(para);

			} catch(err) {
				console.log(err);
			} finally {
				i++;
			}
		})
	} catch(e) {
		console.log(e);
	}		
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function tkCPEossInfo(snippet){
	if(snippet=="true"){// show cpe Info in iframe
		$('a[href*="cpe"]').each(function(){

			var _self = $(this);
			//add style to OSS link
			_self.css({"background-color":"orange"});

			//var href = 'https://nexus.ntteo.net' + _self.attr('href')
			//var href = 'https://nboss.ntt.eu' + _self.attr('href')
			var href = 'https://eu-nboss.nttltd.global.ntt' + _self.attr('href')

			//create buttons after OSS
			_self.after("<button class='closeFrame'>X</button>");
				$('.closeFrame').css({
					"background-color":"rgb(255, 0, 0)",
					"border":"1px solid rgb(214, 0, 0)",
					"width": "30px",
					"height": "25px",
					"border-radius": "2px",
					"box-shadow": "3px 0px 3px rgba(127, 0, 0, 0.21)"
				});
			_self.after("<button class='openFrame'>V</button>");
				$('.openFrame').css({
					"background-color":"rgb(65, 255, 61)",
					"border":"1px solid rgb(2, 200, 5)",
					"width": "30px",
					"height": "25px",
					"border-radius": "2px",
					"box-shadow": "0px 0px 3px rgb(162, 162, 162)"
				});

			//on click button show frame 
			$('.openFrame').click(function() {

				$("td:contains('Customer Portal Users')").append("<iframe id='cpeInfo' src="+href+" width='100%' height=700></iframe>");

				if ($('iframe').length > 1){
					$('iframe').nextAll('iframe').remove();
				}

				var b = setInterval(function(){
					console.log('working...');
					if($("#cpeInfo").contents().find('a:contains("Status")').length){

						var systemId = $("#cpeInfo").contents().find('a:contains("Status")').eq(0).attr('href').toString().match(/[^id=]\d+/)[0].toString();
						//$("#cpeInfo").attr('src', 'https://nexus.ntteo.net/op-eu?action=view-containers.status&id=' + systemId);
						//nbos url
						//$("#cpeInfo").attr('src', 'https://nboss.ntt.eu/op-eu?action=view-containers.status&id=' + systemId);
						$("#cpeInfo").attr('src', 'https://eu-nboss.nttltd.global.ntt/op-eu?action=view-containers.status&id=' + systemId);

						clearInterval(b);
					}
				}, 100);

			});

			//on click 'X' button delete frame 
			$('.closeFrame').click(function() {
				$('iframe').remove();
			});

		});
	}
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function tkCreateMaint(){
//When removing this filter, please, also comment (add //) to line 138 in gsdScriptv3.js file.
//if((loggedAcc == "jonathan.guillen") || (loggedAcc == "marina.rovira") || (loggedAcc == "benjamin.becker") || (loggedAcc == "eduard.murcia")){
        var CTI = $("th:contains('CTI'):first").next().html();
        CTI = CTI.split("- ",3);

        if (CTI[2] == "Scheduled Maintenance"){

                var maintCat = "XXXXXXX";
                var maintDur = "";
                var startDate = "";
                var sumStartDate = "";
                var startYear = $("input[name='dbfield:4:__raw_custom__:__single__:_meta_value_start_date_1:year']").val();
                var startMonth = "MM";
                var startDay = "DD";
                var startTime = "HH:MM";
                var endDate = "";
                var endYear = $("input[name='dbfield:4:__raw_custom__:__single__:_meta_value_end_date_1:year']").val();
                var endMonth = "MM";
                var endDay = "DD";
                var endTime = "HH:MM";
                var bodyTemp = "bTEMPLATE";
                var currentCKT = "cCKT";
                var cktSystem = ["SYSTEM"];
                var cktNick = ["NICKNAME"];
                var cktDesc = ["AFFECTED SYSTEMS"];
                var cktSplitter = "";
				var systems = [];
				var indexerChar = [" (", ")"];
                var syslength = systems.length;
                var maintSum = "";
                const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'UTC'};

                $("select[name='dbfield:3:__raw_custom__:__single__:source']").val('3');

                function sysCatcher(){
                                systems = [];
                                cktSystem = ["SYSTEM"];
                                cktNick = ["NICKNAME"];
                                cktDesc = ["AFFECTED SYSTEMS"];

                                $("select[name='FPAR_related_configuration_items__sel'] option").each(function(){
										currentCKT = $(this).html();
										
										if (CTI[1] == "Router or Circuit "){
											cktSplitter = currentCKT.split("[ Circuit: ",2);
											cktSplitter = cktSplitter[1].split(", System: ",2);

											cktDesc.push(cktSplitter[0]);

											if(cktSplitter[1].indexOf(" (") > -1){
											cktSplitter = cktSplitter[1].split(" (",2);
											cktSystem.push(cktSplitter[0]);
											cktNick.push(cktSplitter[1].substr(0,cktSplitter[1].indexOf(")")));
											}else{
											cktSystem.push(cktSplitter[1].substr(0,10));
											cktNick.push("No Nickname");
											}
										}
										
										if ((CTI[1] == "Router ") || (CTI[1] == "Circuit ")){
											cktSplitter = currentCKT.split(" (",2);
											
											cktSystem.push(cktSplitter[0]);
											cktNick.push(cktSplitter[1].substr(0,cktSplitter[1].indexOf(")")));
										}

                                        systems.push(currentCKT);
                                });
                }

                function tempComposer(){

                        startDate = startYear + "-" + startMonth + "-" + startDay + "T" + startTime + "Z";
                        endDate = endYear + "-" + endMonth + "-" + endDay + "T" + endTime + "Z";
                        
						sumStartDate = startYear + "-" + startMonth + "-" + startDay + " - " + startTime;
						sumEndTime = endTime + " UTC";

                        startDate = new Date (startDate);
						endDate = new Date (endDate);
                        
                        maintDur = Math.abs(endDate.getTime() - startDate.getTime());
                        maintDur = Math.ceil(maintDur/(1000*60));
                        
                        if (isNaN(maintDur)){
                            maintDur="";
                        }else{
                            maintDur= "\nDuration: " + maintDur + " min";
                        }

                        startDate = startDate.toLocaleString("en-GB", dateOptions);
                        startDate = startDate.toString();
                        startDate = startDate + " UTC";
                        
                        endDate = endDate.toLocaleString("en-GB", dateOptions);
                        endDate = endDate.toString();
                        endDate = endDate + " UTC";
                        
                        syslength = systems.length;
                        maintSum = 'NTT - ' + maintCat + ' - ' + sumStartDate + ' - ' + sumEndTime;
                                
                        if (syslength == 0){
                            $("textarea[name='dbfield:3:__raw_custom__:__single__:details']").attr('rows','21');
                            cktSystem = ["SYSTEM"];
                            cktNick = ["NICKNAME"];
                            cktDesc = ["- No systems selected.\n"];
                        } else {
                            $("textarea[name='dbfield:3:__raw_custom__:__single__:details']").attr('rows','25');
                            for(var i=1; i<=syslength; i++){
                                if (maintSum.length + cktSystem[i].length + cktNick[i].length + 6 < 200){
                                   maintSum = maintSum + ' | ' + cktSystem[i] + ' (' + cktNick[i] + ')';
                                } else {
                                   maintSum = 'NTT - ' + maintCat + ' - ' + sumStartDate + ' | Multiple Services |';
                                   break;
                                }
                            }
                            
							cktDesc[0] = "";
							
							if (CTI[1] == "Router or Circuit "){
								indexerChar[0] = "[ ";
								indexerChar[1] = " ]";
							}
                            
                            for(var i=0; i < systems.length; i++){
                                cktSplitter = "";

                                /*cktSplitter = systems[i].split("[ Circuit: ",2);
                                cktSplitter = cktSplitter[1].split(", System: ",2);*/

                                cktSplitter = systems[i].split(indexerChar[0],2);
                                cktSplitter = cktSplitter[1].split(indexerChar[1],2);

								cktDesc[0] = cktDesc[0] + "- " + cktSplitter[0] + "\n";
								

                            }
                        }
                        startDate= "\nStart Time: " + startDate;
                        
                        if(endDate=="Invalid Date"){
                            endDate = "";
                        }else{
                            endDate = "\nEnd Time: " + endDate;
                        }
                        
                        //bodyTemp = "Dear Customer,\n\nWe would like to inform you of the following network maintenance work.\n\nAffected service:\n" + cktDesc[0] + startDate + endDate + maintDur + "\n\nImpact: An interruption or degradation of up to XX minutes may occur at any point of the maintenance window.\n\nDetails: <Insert details provided by Carrier>\n\nWe do sincerely apologize for any inconvenience caused by this maintenance.\nIf you have any queries, please do not hesitate to contact us back.\n\n"+signature_template;
                        bodyTemp = "Dear Customer,\n\nWe would like to inform you of the following network maintenance work.\n\nAffected service:\n" + cktDesc[0] + startDate + endDate + "\n\nImpact: An interruption or degradation of up to XX minutes may occur at any point of the maintenance window.\n\nDetails: Local carrier will be performing mandatory maintenance works within their network to ensure a high level of quality and stability across network performances.\n\nWe do sincerely apologize for any inconvenience caused by this maintenance.\nIf you have any queries, please do not hesitate to contact us back.\n\n"+signature_template;

                }

                function textFiller(){
                        $("input[name='dbfield:3:__raw_custom__:__single__:summary']").val(maintSum);
                        $("textarea[name='dbfield:3:__raw_custom__:__single__:details']").val(bodyTemp);
                }

                sysCatcher();
                tempComposer();
                textFiller();


                $("select[name='dbfield:3:__raw_custom__:__single__:_meta_value_maintenance_category_1']").change(function(){
                                maintCat = $(this).find(":selected").text();
                                tempComposer();
                                textFiller();
                });

                $("input[name='dbfield:4:__raw_custom__:__single__:_meta_value_start_date_1:time']").change(function(){
                                startTime = $(this).val();
                                tempComposer();
                                textFiller();
                });

                $("input[name='dbfield:4:__raw_custom__:__single__:_meta_value_start_date_1:mday']").change(function(){
								startDay = parseInt($(this).val());
								if ((startDay > 0) && (startDay<10)){
									startDay = "0" + startDay;
								}
                                tempComposer();
                                textFiller();
                });

                $("select[name='dbfield:4:__raw_custom__:__single__:_meta_value_start_date_1:month']").change(function(){
								startMonth = $(this).val();
								if ((startMonth > 0) && (startMonth<10)){
									startMonth = "0" + startMonth;
								}
                                tempComposer();
                                textFiller();
                });

                $("input[name='dbfield:4:__raw_custom__:__single__:_meta_value_start_date_1:year']").change(function(){
                                startYear = $(this).val();
                                tempComposer();
                                textFiller();
                });

                $("input[name='dbfield:4:__raw_custom__:__single__:_meta_value_end_date_1:time']").change(function(){
                                endTime = $(this).val();
                                tempComposer();
                                textFiller();
                });

                $("input[name='dbfield:4:__raw_custom__:__single__:_meta_value_end_date_1:mday']").change(function(){
								endDay = parseInt($(this).val());
								if ((endDay > 0) && (endDay<10)){
									endDay = "0" + endDay;
								}
								tempComposer();
								textFiller();
				});

				$("select[name='dbfield:4:__raw_custom__:__single__:_meta_value_end_date_1:month']").change(function(){
								endMonth = $(this).val();
								if ((endMonth > 0) && (endMonth<10)){
									endMonth = "0" + endMonth;
								}
								tempComposer();
								textFiller();
				});

                $("input[name='dbfield:4:__raw_custom__:__single__:_meta_value_end_date_1:year']").change(function(){
                                endYear = $(this).val();
                                tempComposer();
                                textFiller();
                });

                $("input[name='FPAR_related_configuration_items_add_button']").click(function(){
                                sysCatcher();
                                tempComposer();
                                textFiller();
                });

                $("#FPAR_related_configuration_items_add_button").click(function(){
                                sysCatcher();
                                tempComposer();
                                textFiller();
                });

                $("#FPAR_related_configuration_items_add_button").next().next().click(function(){
                                sysCatcher();
                                tempComposer();
                                textFiller();
                });

        }
//} // This will need to be deleted or commented when removing the filter.
}


//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function tkHideUnpublished(snippet) {
	if (snippet=="true") {
		// This if statement creates the button only if it does not exist
		if(document.getElementById('btn-unpub') == undefined || document.getElementById('btn-unpub') == null) {
			// Initial variables
			var originalTable = document.querySelectorAll("#work-log div.data-table.multiple-row-table table")[0];
			var publishedTable = document.createElement("table");
			publishedTable.id = "publishedTable";
			publishedTable.setAttribute("class", "data multiple-row");
			publishedTable.setAttribute("style", "display: none;");

			// This creates the new table with the correct values
			(function createPublishedTable() {
			var tempOriginalTable = originalTable.cloneNode(true); // this makes a copy of the original table, working on the original would remove rows
			var publishedRows = [];
			var pubRowCount = 0;
			var originalRows = tempOriginalTable.querySelectorAll("tr");
			var firstCell;
			var secondCell;
			var thirdCell;
			var fourthCell;
			
			// this cicles through all rows of the original table
			for (i=0; i<originalRows.length; i++) {
				var rowTabs;
				// this is for the first row
				if (i == 0) {
				publishedRows[pubRowCount] = originalRows[i];
				pubRowCount++;
				rowTabs = originalRows[1].querySelectorAll("td");
				firstCell = rowTabs[0].innerHTML;
				secondCell = rowTabs[1].innerHTML;
				thirdCell = rowTabs[2].innerHTML;
				fourthCell = rowTabs[3].innerHTML;
				}
				else {
				var tempRow;
				rowTabs = originalRows[i].querySelectorAll("td");
				var publishedPos = 7 - (10 - rowTabs.length);
				// this makes sure the row has 10 cells
				if (rowTabs.length == 10) {
					firstCell = ((rowTabs[0].innerText != "" && rowTabs[0].innerText != "Not set") ? rowTabs[0].innerHTML : firstCell);
					secondCell = ((rowTabs[1].innerText != "" && rowTabs[1].innerText != "Not set") ? rowTabs[1].innerHTML : secondCell);
					thirdCell = ((rowTabs[2].innerText != "" && rowTabs[2].innerText != "Not set") ? rowTabs[2].innerHTML : thirdCell);
					fourthCell = ((rowTabs[3].innerText != "" && rowTabs[3].innerText != "Not set") ? rowTabs[3].innerHTML : fourthCell);
				} else if (rowTabs.length == 9) {
					secondCell = ((rowTabs[0].innerText != "" && rowTabs[0].innerText != "Not set") ? rowTabs[0].innerHTML : secondCell);
					thirdCell = ((rowTabs[1].innerText != "" && rowTabs[1].innerText != "Not set") ? rowTabs[1].innerHTML : thirdCell);
					fourthCell = ((rowTabs[2].innerText != "" && rowTabs[2].innerText != "Not set") ? rowTabs[2].innerHTML : fourthCell);
				} else if (rowTabs.length == 8) {
					thirdCell = ((rowTabs[0].innerText != "" && rowTabs[0].innerText != "Not set") ? rowTabs[0].innerHTML : thirdCell);
					fourthCell = ((rowTabs[1].innerText != "" && rowTabs[1].innerText != "Not set") ? rowTabs[1].innerHTML : fourthCell);
				} else if (rowTabs.length == 7) {
					fourthCell = ((rowTabs[0].innerText != "" && rowTabs[0].innerText != "Not set") ? rowTabs[0].innerHTML : fourthCell);
				} 

				// this checks that we only work with published rows
				if (publishedPos >= 2 && rowTabs[publishedPos-1].innerText == "Yes") {
					tempRow = originalRows[i];
					// this makes sure all rows have 10 cells
					switch (publishedPos) {
					case 2:
						var newCell = tempRow.insertCell(0);
						newCell = tempRow.insertCell(0);
						newCell.innerHTML = fourthCell;
						newCell = tempRow.insertCell(0);
						newCell.innerHTML = thirdCell;
						newCell = tempRow.insertCell(0);
						newCell.innerHTML = secondCell;
						newCell = tempRow.insertCell(0);
						newCell.innerHTML = firstCell;
						break;
					case 3: 
						var newCell = tempRow.insertCell(0);
						newCell.innerHTML = fourthCell;
						newCell = tempRow.insertCell(0);
						newCell.innerHTML = thirdCell;
						newCell = tempRow.insertCell(0);
						newCell.innerHTML = secondCell;
						newCell = tempRow.insertCell(0);
						newCell.innerHTML = firstCell;
						break;
					case 4:
						var newCell = tempRow.insertCell(0);
						newCell.innerHTML = thirdCell;
						newCell = tempRow.insertCell(0);
						newCell.innerHTML = secondCell;
						newCell = tempRow.insertCell(0);
						newCell.innerHTML = firstCell;
						break;
					case 5:
						var newCell = tempRow.insertCell(0);
						newCell.innerHTML = secondCell;
						newCell = tempRow.insertCell(0);
						newCell.innerHTML = firstCell;
						break;
					case 6:
						var newCell = tempRow.insertCell(0);
						newCell.innerHTML = firstCell;
						break;
					default: 
						break;
					}
					publishedRows[pubRowCount] = tempRow;
					pubRowCount++;
				}
				
				// this adds the row number classes accordingly
				for (j=0; j<publishedRows.length; j++) {
					if (j%2 == 0) {
					publishedRows[j].class = "row2";
					var cells = publishedRows[j].querySelectorAll("td");
					if (cells.length) {
						for (z = 0; z < cells.length; z++) {
						if (cells[z].hasAttribute("class")) {
							if (cells[z].classList.contains("row1")) {
							cells[z].classList.remove("row1");
							cells[z].classList.add("row2");
							}
						}
						else {
							cells[z].setAttribute("class", "row2");
						}
						if (cells[z].hasAttribute("rowspan")) {
							cells[z].removeAttribute("rowspan");
						}
						}
					}
					}
					else {
					publishedRows[j].class = "row1";
					var cells = publishedRows[j].querySelectorAll("td");
					if (cells.length) {
						for (z = 0; z < cells.length; z++) {
						if (cells[z].hasAttribute("class")) {
							if (cells[z].classList.contains("row2")) {
							cells[z].classList.remove("row2");
							cells[z].classList.add("row1");
							}
						}
						else {
							cells[z].setAttribute("class", "row1");
						}
						if (cells[z].hasAttribute("rowspan")) {
							cells[z].removeAttribute("rowspan");
						}
						}
					}
					}
					publishedTable.appendChild(publishedRows[j]);
				}
				}
			}
			originalTable.parentNode.insertBefore(publishedTable, originalTable.nextSibling);
			})();
			
			// Toggle Button to hide/show unpublished ticket updates
			var toggleButton = newButton("Show published");
			toggleButton.id = 'btn-unpub';
			toggleButton.style.marginLeft = "20px";
			toggleButton.style.width = "9em";
			toggleButton.addEventListener("click", hide, false);
			var pos = document.querySelectorAll("#work-log table td.header_title")[0];
			// pos.parentNode.insertBefore(toggleButton, pos.nextSibling);
			pos.append(toggleButton);

			// Toggle functions
			function hide() {
			toggleButton.value = "Show all";
			originalTable.setAttribute("style", "display: none;");
			publishedTable.setAttribute("style", "display: table;");
			toggleButton.removeEventListener("click", hide, false);
			toggleButton.addEventListener("click", show, false);
			}

			function show() {
			toggleButton.value = "Show Published";
			publishedTable.setAttribute("style", "display: none;");
			originalTable.setAttribute("style", "display: table;");
			toggleButton.removeEventListener("click", show, false);
			toggleButton.addEventListener("click", hide, false);
			}
		}
	}
}


//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~= GENERIC REUSABLE FUNCTIONS =~=~=~=~=~=~=~=~=~=~=~=~=~=//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

// function to add multiple attributes at once. "elem" refers to the object who gets the attributes, "obj" can be
// opened as an array to add multiple attributes in the form off ==> attrb: "value",
function setAttributes(elem, obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			elem[prop] = obj[prop];
		}
	}
}

// this function creates a button with a predefined style. I would suggest creating a unique style for all buttons
// related to the Profile Manager script. "valueText" refers to the text displayed on the button.
function newButton(valueText) {
	var btn = document.createElement("input");
	setAttributes(btn, {
		type: "button",
		class: "nexus_button",
		value: valueText,
		style: "color: #00fff2; background-color: #003a6d; border-color: #003a6d; border-radius: 5px;"
	});
	return btn;
}

// function to retrieve the current open ticket number
function getTicketNr() {
	var ticketNr = $('div#navbar-inner a:contains("TK-")')[0].innerText;
	return ticketNr;
}


//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function tkTest(){
	if(loggedAcc == "jonathan.guillen"){

	}
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function alColors(){
		$("td.header_title:contains('History')").parents().eq(3).next().find('td:nth-child(1):contains("'+current_user+'")').css("background-color","#9fc4f9");
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function alView(){
		// change style of alerts page [left/right] sections
		// [left] - alert info
		// [right] - open tickets for system/service

		// get td 'Open Tickets'
		open_tickets=$("td.header_title:contains('Open Tickets')");
		if (open_tickets[0]){right_side=open_tickets.parents().eq(4)}
		else{right_side=$('<div class="header_title">No Open Tickets</div>')}
		page_contents=$('#page-content');
		div_csc_remix = $('<div id="csc_remix_topdiv">')
		div_csc_remix.prependTo(page_contents)
		table = $("<table id='new_table'>");
		table.appendTo(div_csc_remix)
		tr = $("<tr>");
		tr.appendTo(table);

		// LEFT
		td= $("<td VALIGN=TOP id='left_td'>");  
		td.appendTo(tr);
		div_left_side = $('<div id="div_left_side">')
		div_left_side.appendTo(td)
		table_left_side=$("<table id='left_table'>")
		table_left_side.appendTo(div_left_side)
		left_side_trs=$('.data.single-row>tbody tr:nth-child(-n+12)');
		left_side_trs.appendTo(table_left_side)
		
		// RIGHT
		td= $("<td VALIGN=TOP id='right_td'>");
		td.appendTo(tr);    
		right_side.appendTo(td);
		
		//move test results to the top
		test_results_div=$(".section_content:contains('Retest') > div:only-child");
		if (test_results_div != undefined && test_results_div != null) test_results_div.parents().eq(0).prependTo(page_contents)
		//move "clear", "retest", etc buttons to the top
		alert_action_td=$("td[class='alert-action']")
		if(alert_action_td) alert_action_td.parents().eq(4).prependTo(page_contents)
		alert_tools_td=$("td[class='alert-tools']")
		if(alert_tools_td) alert_tools_td.parents().eq(4).prependTo(page_contents)
		
		//move support notes div
		$("td.header_title:contains('Support Notes')").parents().eq(4).insertAfter($("td.header_title:contains('AL-EU')").parents().eq(4))
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function alHighlights(){
		iserver=$("#left_table a:contains('euw'), #left_table a:contains('evw'), #left_table a:contains('eue'), #left_table a:contains('eul'), #left_table a:contains('evl')"),asummary=$("#left_table td.row2:eq(1)").text().toLowerCase(),(asummary=iserver.length>0)&&$("#left_table td.row2:contains('Ping failed')").append(" on server - Investigate status").css({"font-size":"18px",background:"repeating-linear-gradient(135deg, gold, white 10px, gold 20px)","font-weight":"bolder"});
		
		if ($("#left_table").text().toLowerCase().indexOf("failover") > -1) {
			page_contents.css("background-color","yellow"),page_contents.css("background-image","url('https://gsd.ntt.eu/guRgNpz.png')"),$("input[value='Retest']").hide(),$("input[value='Run Diagnostics']").hide(),$("input[value='Clear']").hide(),$("input[value='Suppress']").hide(),$("input[value='Create Ticket']").css("font-weight","bold"),$("td.row2:contains('HA failover')").append(" - Create ticket and investigate").css({"background-color":"yellow","font-size":"18px","font-weight":"bolder"});
		}
		
		if ((($("#left_table").text().toLowerCase().indexOf("system/ip/customer euf") > -1) || ($("#left_table").text().toLowerCase().indexOf("system/ip/customer evf") > -1)) && $("#left_table").text().toLowerCase().indexOf("summary ping failed")) {
			page_contents.css("background-color","yellow"),page_contents.css("background-image","url('https://gsd.ntt.eu/guRgNpz.png')"),$("input[value='Retest']").hide(),$("input[value='Run Diagnostics']").hide(),$("input[value='Clear']").hide(),$("input[value='Suppress']").hide(),$("input[value='Create Ticket']").css("font-weight","bold"),$("td.row2:contains('HA failover')").append(" - Create ticket and investigate").css({"background-color":"yellow","font-size":"18px","font-weight":"bolder"});
		}

		if ($("#left_table").text().toLowerCase().indexOf("op5") > -1) {
			page_contents.css("background-color","white"),page_contents.css("background-image","url('https://gsd.ntt.eu/gahqelS.jpg')"),page_contents.css("background-position","0px -180px"),$("input[value='Retest']").hide(),$("input[value='Run Diagnostics']").hide(),$("input[value='Suppress']").hide(),$("input[value='Create Ticket']").css("font-weight","bold"),$("td.row2:contains('[op5]')").append(" - Bear in mind this Alert was injected from OP5").css("font-weight","bold");
		}

		if ($("#left_table").text().toLowerCase().indexOf("has taken over this node") > -1) {
			page_contents.css("background-color","#f5f5f5"),page_contents.css("background-image","url('https://gsd.ntt.eu/kPPl5d5.png')"),page_contents.css("background-repeat","no-repeat"),page_contents.css("background-position","345px 73px"),$("input[value='Retest']").hide(),$("input[value='Run Diagnostics']").hide(),$("input[value='Clear']").hide(),$("input[value='Suppress']").hide(),$("input[value='Create Ticket']").css("font-weight","bold"),$("td.row2:contains('not OK')").append(" - Node Takeover - Create ticket and investigate").css({"font-size":"18px","font-weight":"bolder"});
		}

		//Runbook Highlight
		$("td.header_title:contains('Runbook')").parents().eq(4).insertBefore($("td.header_title:contains('AL-EU')").parents().eq(4)).css("background-color", "#0ff")
		$("th.row1:contains('Runbook Url')").css({
			"background-color": "#0ff",
			"font-size": "16px",
			"font-weight": "bold"
		}).insertBefore($("td.header_title:contains('Open Tickets')").parents().eq(4))
		$("th.row2:contains('Runbook Url')").css({
			"background-color": "#0ff",
			"font-size": "16px",
			"font-weight": "bold"
		}).insertBefore($("td.header_title:contains('Open Tickets')").parents().eq(4))
		$("td.row1:contains('view-runbooks')").css({
			"background-color": "#0ff",
			"font-size": "16px",
			"font-weight": "bold"
		}).insertBefore($("td.header_title:contains('Open Tickets')").parents().eq(4))
		$("td.row2:contains('view-runbooks')").css({
			"background-color": "#0ff",
			"font-size": "16px",
			"font-weight": "bold"
		}).insertBefore($("td.header_title:contains('Open Tickets')").parents().eq(4))
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function alTicketSearch(){
			var scriptCode = new Array();
			scriptCode.push("function searchInTickets()");
			scriptCode.push("{");
			scriptCode.push("var input = document.getElementById('searchBox').value.toLowerCase(), len = input.length, listOfTickets = document.getElementsByClassName('sir_gui_input')[0].options;");
			scriptCode.push("for(var i=0; i<listOfTickets.length; i++) {");
			scriptCode.push("if (!!~listOfTickets[i].text.toLowerCase().indexOf(input)) { listOfTickets[i].selected = true; break; } else {listOfTickets[0].selected = true; listOfTickets[0].text = \"Not Set - Not Found - You shall not pass!\"} }");
			scriptCode.push("if (input == '' ) listOfTickets[0].selected = true;");
			scriptCode.push("}");
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.innerHTML = scriptCode.join("\n");
			scriptCode.length = 0;
			$("head").append(script);
			$("td.header_title:contains('Add to Ticket')").append(' - &#128270; Search <input type="text" id="searchBox" onkeyup="searchInTickets()">');
			$("#searchBox").focus();
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function alURLS(snippet){
		if(snippet=="true" && ( $(".runbook").text().indexOf("http")>-1 ) ) {
				var runText = $(".runbook:contains('http')").html();
				var runRest = runText.toLowerCase();
				var runLinks = [];
				var urlEnds = [" ",". ",", ","(",")","[","]","{","}","'","; ","<br>"];
				var endIndex = [];
				var urlStr = "";
				var smallerIndex;
				var finalIndex=[];

				while (runRest!=""){
						if(runRest.indexOf("http")>-1){
							runRest=runRest.substring(runRest.indexOf("http")); //Cuts the runbook from the next link to the end.

							for(var i=0; i<urlEnds.length; i++){
								var e= runRest.indexOf(urlEnds[i]);
								if (e>-1){
									endIndex.push(e);
								}	
							}

							smallerIndex = endIndex.min();

							runLinks.push(runRest.substring(0,smallerIndex));
							runRest=runRest.substring(smallerIndex);
						}else{
							runRest=runText.toLowerCase();
							
							for(var i=0; i<runLinks.length; i++){
									finalIndex[0] = runRest.indexOf("http")+9;
									runRest = runRest.replace(runLinks[i],"<a href='"+runLinks[i]+"'>"+runLinks[i]+"</a>");
									runRest = runRest.replace_at(finalIndex[0],"xxxx");

									finalIndex[1] = runRest.indexOf("http");
									runRest = runRest.replace_at(finalIndex[1],"yyyy");

									runText = runText.replace_at(finalIndex[0]-9,runLinks[i]);
									runText = runText.splice(finalIndex[0]-9,runLinks[i].length,"<a href='"+runLinks[i]+"'>"+runLinks[i]+"</a>");
							}
							runRest="";
						}
						endIndex=[];
				}
				$(".runbook:contains('http')").html(runText);
		}
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function ncChange(){
	//I'm not sure that anybody wants new alerts over the CRs. Disabling it until confirmed.
	//$("td.header_title:contains('Alerts Requiring Attention')").parents().eq(4).insertBefore($("td.header_title:contains('Scheduled Events')").parents().eq(4));
	$("td.header_title:contains('Tickets requiring action')").parents().eq(4).hide();
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function ncOwnershipAll(snippet){
	if(snippet=="true"){
			//I'm not sure that anybody wants new alerts over the CRs. Disabling it until confirmed.
			//$("td.header_title:contains('Alerts Requiring Attention')").parents().eq(4).insertBefore($("td.header_title:contains('Scheduled Events')").parents().eq(4));
			$("td.header_title:contains('Tickets requiring action')").parents().eq(4).hide();

				var alertsReqAtt = $('.section_content:contains("Alerts Requiring Attention")');
				var id = '';
				//var link = 'https://nexus.ntteo.net/op-eu?action=alert-own&id=';
				//var link = 'https://nboss.ntt.eu/op-eu?action=alert-own&id=';
				var link = 'https://eu-nboss.nttltd.global.ntt/op-eu?action=alert-own&id=';

				if(
					// Alerts Requiring Attention section exists
					(alertsReqAtt !== null && alertsReqAtt.length >= 1) &&
					// No Alerts Require Attention is not found
					(alertsReqAtt.children().eq(1).find('tr:contains("No Alerts Require Attention")').length != 1) &&
					// ALerts counter is more than 1
					(alertsReqAtt.children().eq(1).find('tr').length >= 2)
				) {
					console.log('[Ownership All] - FOUND - Alerts Requiring Attention');

					// create an empty button
					alertsReqAtt.children().eq(0).find('.header_title').append('<button class="btnOwnershipAll" style="margin: 0 10px;background-color: #d93838;color: #fff; display: initial;">Ownership All</button>');

					// assign a function to a button
					$(".btnOwnershipAll").click(function() {

						alertsReqAtt = alertsReqAtt.children().eq(1).find('td:nth-child(1)');

						// if there are more than 10 alerts, open first 10 and reload a page after 5 secs
						if($('.section_content:contains("Alerts Requiring Attention")').children().eq(1).find('tr').length >= 15) {
							for(var i = 0; i < 15; i++) {
								id = alertsReqAtt.eq(i).html().match(/[^id=]\d+/)[0].toString();
								window.open(link + id);
								// change text of the button
								$('.btnOwnershipAll').text('Ownership first 15');
								// reload page after 5 sec on btn click
								setTimeout(function() { location.reload(); }, 5e3);
							}
							// else open all (in case less than 15)
						} else {
							for(var i = 0; i < alertsReqAtt.length; i++) {
								id = alertsReqAtt.eq(i).html().match(/[^id=]\d+/)[0].toString();
								window.open(link + id);
								// reload page after 5 sec on btn click
								setTimeout(function() { location.reload(); }, 5e3);
							}
						}

					});

				} else { console.log('[Ownership All] - NOT FOUND - Alerts Requiring Attention'); }
	}
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function ncAlertsBgColorCountdown(snippet){
	if(snippet=="true"){
			var firstTime;
			var eachTime;
			var inTimeVal;

			$(".section_header").each(function(){
					var alertHeaders = ["Alerts Requiring Attention", "Alerts Owned by Other People", "Alerts Owned by You"];

					for (var i=0; i<alertHeaders.length; i++){
							if(($(this).text().indexOf(alertHeaders[i])) > -1){
									//alert($(this).next().children().children().children().children().next().prop("tagName"));

									firstTime = $(this).next().children().children().children().children().next().find("td:nth-child(3)").each(function(){

										eachTime= $(this).text();

										if (eachTime.indexOf("mins")>-1){
												inTimeVal = eachTime.replace(" mins","");
												inTimeVal = Number(inTimeVal);

												if (inTimeVal < 10){
														$(this).css("background","#98fb98");
												}

												if ((inTimeVal >= 10) && (inTimeVal < 15)){
														$(this).css("background","#ffdf00");
												}

												if (inTimeVal >= 15){
														$(this).css("background","#e60000");
												}
										}

										if (eachTime.indexOf("secs")>-1){
												$(this).css("background","#98fb98");
										}

										if ((eachTime.indexOf("hrs")>-1) || (eachTime.indexOf("days")>-1) || (eachTime.indexOf("wks")>-1)){
												$(this).css("background","#e60000");
										}
									});
							}
					}
			});
	}
}



//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

/* function santenScript(snippet){
		if (snippet=="true"){
				var newScript = document.createElement('script');
	
				newScript.src = "https://gsd.ntt.eu/dev/modular/GSD_Santen.js";
				newScript.async = false;
				newScript.defer = true;
				document.body.appendChild(newScript);
		}
} */

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~ AUTO REDIRECT-OWNERSHIP ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

function tkAutoRedirOwnership(snippet) {
	if (snippet=="true") {
		var ticketNr = getTicketNr();
		var ticketID = urlid;
		var redirSubmit = $('div#redirect form')[0];
		var redirCookie = getCookie(ticketNr);

		// This part only executes if the cookie exists and is not empty
		if(typeof redirCookie != 'undefined' && redirCookie != '') {
			//location.href = 'https://nexus.ntteo.net/angora-op-gui-eu?action=take-ownership&id=' + redirCookie;
			//location.href = 'https://nboss.ntt.eu/angora-op-gui-eu?action=take-ownership&id=' + redirCookie;
			location.href = 'https://eu-nboss.nttltd.global.ntt/angora-op-gui-eu?action=take-ownership&id=' + redirCookie;
			delCookie(ticketNr);
			return;
		}

		// this will prevent the default redirect action and will ensure the auto take ownership
		if (typeof redirSubmit != 'undefined') {
			var teamValues = [76, 87, 177, 551, 180, 193, 210, 42, 678, 89, 75, 554, 196, 171 /* IT Ops - Support*/];
			redirSubmit.addEventListener('submit', function(event) {
				event.preventDefault();
				var team = document.getElementsByName('dbfield:3:__raw_custom__:__single__:redirect_team')[0].value;
				if (teamValues.inArray(Number(team))) {
					setCookie(ticketNr, ticketID, 1);
					window.open(window.location.href);
				};
				this.removeEventListener('submit', event);
				this.submit();
			});
		}
	}
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~= ALWAYS OPEN WITH VIEW ALL =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

// This function automates the task of opening a ticket in the "view all" view
// Spoke with Cristiano (requester), we will leave it like this for now. We might improve it
// some day using the 'load balancer' option
function tkAlwaysViewAll(snippet) {
	if (snippet=="true") {
		// window.onload = function() {
			var ticketURL = window.location.href;
			var showAllURL, x;
			x = ticketURL.indexOf('block=');
			// if the string 'block=' does not exist in the URL, it adds the parameter and
			// reloads the ticket to the correct 'view all' URL
			if (x == -1) {
				showAllURL = ticketURL + '&block=12:.a';
				window.location.href = showAllURL;
			} else {
			}
		// }
	}
} 

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~= ALERTS: HIDE RETEST IF 'DO NOT RETEST' =~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//


function tkHideRetest() {
    var runbook = $('.runbook')[0];
    
	if (runbook != undefined) {
	    runbook = runbook.innerText;
    	runbook = runbook.toLowerCase();
    	if (runbook.includes('do not retest')) {
    	  $('input[value="Retest"]').hide();
    	}
	}
  }

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

/**
 * @description adds a template in the ticket creation view for CTIs IT Ops - Support - Password Reset, Account unlock or Encryption
 * @requires jQuery libraries
 */
function tkitOPScreate() {
	try{ // IT - OPS

		{ 
			// add summary and details to 
			// ISS - Communications & Support - Encryption Problems
			// ISS - Communications & Support - Password Problems

			var summary_1617 = 'IT Operations - Support - ';
			var summary_1619 = 'IT Operations - Support - ';

			var details_1617 = 'User called and requested for recovery key.\n\nAction taken: Provided key and user could access computer.\n\nKind regards,';
			var details_1619 = 'User called and requested for password reset / account unlocking.\n\nAction taken: ____________\n\nKind regards,';

			// function to load summary list on ticket creation
			function it_Ops_auto_summary(){

				var // variables
					_url = 'https://gsd.ntt.eu/dev/it_ops/data/dataCTI.json',
					dataCTi = '',
					// add elems
					ctiList = '<div class="ctiList"><ul></ul></div>',
					ctiListBtn = '<span class="ctiListBtn"">\u25bc</span>';
					
				// add ctiList after summary and addstyle to it
				// css
				$('head').append(`
				<style>
					.ctiList{display:none; position: absolute;min-height: 50px;width: 660px;background-color: whitesmoke;}
					.ctiList > ul {list-style: none; font-size: 15px; margin: 0px; padding: 5px;}
					.ctiList > ul > li{width:100%;}
					.ctiList > ul > li:hover{background-color:yellow; cursor:pointer;}
					.ctiListBtn{ margin-top: -5px; width: 40px; height: 40px; text-align: center; position: absolute; font-size: 30px; cursor: pointer; -webkit-transition: .1s; transition: .1s;}
					.ctiListBtn:hover{color:red;}
				</style>`);
				// html ctiList
				$('input[name="dbfield:3:__raw_custom__:__single__:summary"]').after(ctiList);
				// html ctiListBtn
				$('input[name="dbfield:3:__raw_custom__:__single__:summary"]').after(ctiListBtn);
				// disable autocomplete for summary - autocomplete off
				document.getElementsByName('dbfield:3:__raw_custom__:__single__:summary')[0].setAttribute('autocomplete', 'off');

				// on click .ctiListBtn display div .ctiList
				// on click summary input
				var a_click = 0;
				function showCtiList(){
					if(a_click === 0){
						$('.ctiList').css({'display':'block'})		
						a_click = 1;
					}else if(a_click === 1){
						$('.ctiList').css({'display':'none'})
						a_click = 0;
					}	
				}
				document.querySelector('input[name="dbfield:3:__raw_custom__:__single__:summary"]').addEventListener('click', function(){showCtiList()});
				document.querySelector('.ctiListBtn').addEventListener('click', function(){showCtiList()});

				// hide ctiList div on mouseleave
				document.getElementsByClassName('ctiList')[0].addEventListener('mouseleave', function(){
					document.getElementsByClassName('ctiList')[0].style.display = 'none'}
				);

				(function(){
					var xhr = new XMLHttpRequest();
					xhr.onreadystatechange = function() {
						if (xhr.readyState === 4) {
							dataCTi = xhr.response; // assign a response to a var
							dataCTi = JSON.parse(dataCTi);		

							// loop through dataCTi values in summary
							function loopThroughCtiList(_target){
								// create list
								for(var i = 0; i < _target.summary.length; i++){
									$('.ctiList > ul').append('<li>' + _target.summary[i] + '</li>')
								};
								// on click <li> add text to summary
								$( ".ctiList > ul > li" ).each(function( index ) {
									$( this ).click(function(){

										document.getElementsByName('dbfield:3:__raw_custom__:__single__:summary')[0].focus();
										
										var temp_summary = document.getElementsByName('dbfield:3:__raw_custom__:__single__:summary')[0];
										if(temp_summary.value.match(/IT Operations \- Support \- $/g) !== null){
											temp_summary.value += '' + $( this ).text();
										}else{
											var a = temp_summary.match(/IT Operations \- Support \- /g).toString();
											document.getElementsByName('dbfield:3:__raw_custom__:__single__:summary')[0].value = a + $( this ).text();
										}

										showCtiList();

									});
								});
							}

							//get text from CTI ('Software - Webex - Incident' for example)
							{
								var cti = $('th:contains("CTI")').next().text();
								if(cti.match(/IT Operations \- Support \- Password Reset\/Account Lockout/g) !== null){
									loopThroughCtiList(dataCTi[1]);
								}else if(cti.match(/IT Operations \- Support \- Encryption/g) !== null){
									loopThroughCtiList(dataCTi[2]);
								}else{
									console.log('this CTI is not defined in dataCTI.json');
								}
							}
						}
					}

					xhr.open('GET', _url, true);
					xhr.send('');

				})();
			}

			if( window.location.href.indexOf("action=create-internal-ticket-follow") > -1 && 	window.location.href.indexOf("ticket-from-cti=1617") > -1 ) { 

				it_Ops_auto_summary();
				document.getElementsByName('dbfield:3:__raw_custom__:__single__:summary')[0].value = summary_1617;
				document.getElementsByName('dbfield:3:__raw_custom__:__single__:details')[0].value = details_1617;
				document.getElementsByName('dbfield:3:__raw_custom__:__single__:summary')[0].focus();

			}else if( window.location.href.indexOf("action=create-internal-ticket-follow") > -1 && 	window.location.href.indexOf("ticket-from-cti=1619") > -1 ) { 

				it_Ops_auto_summary();
				document.getElementsByName('dbfield:3:__raw_custom__:__single__:summary')[0].value = summary_1619;
				document.getElementsByName('dbfield:3:__raw_custom__:__single__:details')[0].value = details_1619;
				document.getElementsByName('dbfield:3:__raw_custom__:__single__:summary')[0].focus();

			}


		}
		
	}catch(e){
		console.log('Errors in IT OPS - GSD');
	}
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~ Link to create Ticket Note ~=~=~=~=~=~==~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

/**
 * @description This function creates a link to the "create note" in the task view normally available only from ticket view, 
 * 				but only if there is no note already
 * @author Diego Fernandez
 * @requires getUrlVars() from accVal.js
 * @requires newButton() from accVal.js
 * @requires jQuery libraries
 */
function tkCreateNote() {
	try {
		// Check if the note exists already
		if ($("td:contains('Ticket Note')").length > 0) {
			return;
		}
		// No note, create the button for the note
		else {
			// get the main ticket ID
			var noteURL = getUrlVars($('a:contains("TK-")')[0].href);
			var noteID = noteURL['id'];
			var noteBtn = newButton('Create Note');
			noteBtn.style.cssFloat = 'right';
		
			// Add event to create the new note
			noteBtn.addEventListener('click', function() {
				//window.open('https://nboss.ntt.eu/angora-op-gui-eu?action=add-ticket_notes&id=' + noteID);
				window.open('https://eu-nboss.nttltd.global.ntt/angora-op-gui-eu?action=add-ticket_notes&id=' + noteID);
			});

			// Get the position and append the button there
			var pos = $('td:contains("TK-")')[0];
			$(pos).append(noteBtn);
		}
		
	} catch(e) {
		console.log(e);
	}
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~ Make URL clickable ~=~=~=~=~=~=~=~==~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

/**
 * @description Makes hyperlinks in notes clickable, if snippet is on
 * @author Diego Fernandez
 * @param snippet true|false
 * @requires jQuery libraries
 */
function tkNoteURLS(snippet){
	// only executes if there is a ticket note in the ticket
	if(snippet=="true" && $("td:contains('Ticket Note')").length > 0 ) {
		try {
			// Gets the correct DIV element
			var noteDiv = $('div td:contains("Ticket Note")').parents('div')[0].nextSibling;
			// Gets the note's div html
			var noteText = $(noteDiv).html();
			var noteRest = noteText.toLowerCase();
			var noteLinks = [];
			var urlEnds = [" ",". ",", ","(",")","[","]","{","}","'","; ","<br"];
			var endIndex = [];
			var smallerIndex;
			var finalIndex=[];

			// While there is some text left over
			while (noteRest!=""){
				// Checks if there are hyperlinks in the text (only if they start with http)
				if(noteRest.indexOf("http")>-1){
					// Cutes the text from the first http ocurrence to the end
					noteRest=noteRest.substring(noteRest.indexOf("http")); 

					// Reviews the html to find the possible url endings
					for(var i=0; i<urlEnds.length; i++){
						var e= noteRest.indexOf(urlEnds[i]);
						if (e>-1){
							endIndex.push(e);
						}	
					}

					// Takes the lowers index value of the endings 
					smallerIndex = endIndex.min();

					// Adds the link to the note link array
					noteLinks.push(noteRest.substring(0,smallerIndex));
					// Cuts the current treated link out of the html
					noteRest=noteRest.substring(smallerIndex);
				}
				// No additional hyperlinks have been found
				// normal text will be replaced with clickable hyperlinks now
				else {
					// Get the full html again
					noteRest=noteText.toLowerCase();
					
					// Replaces each normal text with its correct clickable link
					for(var i=0; i<noteLinks.length; i++){
							finalIndex[0] = noteRest.indexOf("http")+9;
							noteRest = noteRest.replace(noteLinks[i],"<a href='"+noteLinks[i]+"'>"+noteLinks[i]+"</a>");
							noteRest = noteRest.replace_at(finalIndex[0],"xxxx");

							finalIndex[1] = noteRest.indexOf("http");
							noteRest = noteRest.replace_at(finalIndex[1],"yyyy");

							noteText = noteText.replace_at(finalIndex[0]-9,noteLinks[i]);
							noteText = noteText.splice(finalIndex[0]-9,noteLinks[i].length,"<a href='"+noteLinks[i]+"'>"+noteLinks[i]+"</a>");
					}
					noteRest="";
				}
				endIndex=[];
			}
			// Replaces the existing html with the new html with the URLs
			$(noteDiv).html(noteText);
		}
		catch(e) {
			console.log(e);
		}
			
	}
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~= Customer Warning ticket creation =~=~=~=~=~==~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

/**
 * @description displays an alert, when creating the ticket, if the customer of the ticket has special procedures/requirements
 * @author Diego Fernandez
 * @requires jQuery libraries
 */
function tkCustomerWarning() {
	try {
		// This array contains the list of IDs of  "special" customers
		var customers = [ '220', '422', '2166', '2709', '3674', '836', '4073', '38168', '1077', '2391', '37145', '39992', '38116', '35627', '38830', '2337', '2675', '2501', '1853', '2435', '42942', '3445', '3829', '9554', '3485', '2155', '39000', '36691']; // REMOVE: Code is BMW UK, just for testing 
		// This gets the customer ID from the URL
		var currentCustomer = params['ticket-customer'];
		console.log(currentCustomer);
		// Executes if customer is "special"
		if (customers.includes(currentCustomer)) {
			
			var warningTxt = 'This customer has exceptional procedures';
			var warningDiv = newWarning(warningTxt);
			$('textarea[name="dbfield:3:__raw_custom__:__single__:details"]').next().after(warningDiv);

		}
	} catch (e) {
		console.log(e);
	}
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~ Highlight Support Notes ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//


/**
 * @description This function is intendend to highlight all kind of support notes in both, view tickets and view tasks. 
 * 				It will exlcude the "Customer Support Notes" as these are highlighted already by NBOSS/Angora
 * @author Diego Fernandez
 * @requires jQuery libraries
 */
function tkHighlightSupportNotes() {
	// Get all Support Notes, if any
	var supportNotes = $('td:contains("Support Note")');
	// Make sure there is a note, else quit function
	if (supportNotes != undefined || supportNotes != null) {
		// Cycle through each to apply background color
		for (i = 0; i < supportNotes.length; i++) {
			// If it is the Customer support notes, skip
			if (supportNotes[i].innerText.includes("Customer")) {
				continue;
			}
			// Get the support note rows
			let noteRows = $(supportNotes[i]).parent().closest('div').next('div').children().find('tr');
			// Change background for the second cell of each row, except for the header row
			for (let j = 1; j < noteRows.length; j++) {
				let secondCell = noteRows[j].getElementsByTagName('td')[1];
				secondCell.setAttribute("style", "background-color: #0ff");
			}
		}
	}
	
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~= CONFIRM UNRESOLVED TICKET CLOSURE =~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

/**
 * @description This function is intended to avoid accidental closure of ticket if it was reopened by the user
 * @author Diego Fernandez
 * @param snippet true|false
 * @requires jQuery libraries
 */
function tkConfirmUnresolvedClosure(snippet) {
	if (snippet == 'true') {
		// Get closure "Complete Task" button
		let completeTask = $('input[value="Complete Task"]')[0];
		if (completeTask != 'undefined' && completeTask != null) {
			// Button found, check if "Request unresolved" exists
			let unresolved = $('td:contains("Request Unresolved")');
			if (unresolved.length > 0) {
			// Unresolved found, prevent default action
			completeTask.addEventListener('click', function(event) {
				event.preventDefault();
				// Confirm with user 
				let proceed = confirm("The user marked this as unresolved. \nAre you sure you want to close it?");
				if (proceed) {
					$(completeTask).parent("form").submit();
				}
			});
			
			}
		}
	}
}

//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~~=~ TRAINING: HIDE REFERENCE INFORMATION ON TICKET ~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

/**
 * This function does replace all ticket numbers with XXXXXXXXX as well as all user logs with the name  
 * @author Diego Fernandez
 * @param string snippet false|true
 */
function tkHideIdentifyingData(snippet) {
	if (snippet == 'true') {
		let htmlBody = document.body.innerHTML;
		htmlBody = htmlBody.replace(/(TK-EU-\d{8})/g, "TK-EU-â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘");
		// DONE create an array / json object /cookie reader to iterate over all users that are part of the team to replace
		// iterate over worker id and use replace with html on body object
		let members = ['(Oscar Duran)', '(Marta Serra)', '(Gerard Comas)', '(Sergio Fernandez)', '(Jonathan Guillen)', 
						'(Daniel Amat)', '(Martin Nguyen)', '(Aamir Shahzad)', '(Juan Francisco Jaime)', '(Raul Madrid)', 
						'(Alvaro Gutierrez)', '(Aral Keropyan)', '(Erik Requena)', '(David Riquelme)', '(Leonel Garrafa)', 
						'(Emidio Falconi)', '(Romualdo Rosales)', '(Cedric Ezanno)', '(Nicolas Sadofschi)', '(Gracjan Latka)',
						'(Paz Medina)','(Victor Vazquez)','(Fernando Vargas)','(Albert Palazon)','(Flavius Jurca)',
						'(Joan Aguila)','(Gavin Baker)','(Jean Cardier)','(Alejandro Quesada)','(Atif Anwar)',
						'(Georg Katzy)','(David Quesada)','(Julen Octavio)','(Anna Merida)','(Igor Masyuk)',
						'(Gautier Boullanger)','(Christoph Babetzke)','(Robert Jarvinen)','(Edite Fiskovica)','(Jacopo Martinuzzi)',
						'(Aymane Halloum)','(Andrew Wheatley)'];

		let regex = new RegExp(members.join("|"), "gi");
		htmlBody = htmlBody.replace(regex, 'â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘');
		/* regex.forEach(function(member) {
			htmlBody = htmlBody.replace(member, 'Fulanito de PÃ©rez');
			console.log(member);
		});*/

		// 
		document.body.innerHTML = htmlBody;
	}
}




//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//
//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~//

var loadedFunctions = true;
