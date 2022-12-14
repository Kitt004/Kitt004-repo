// ==UserScript==
// @name [GSD] - Core LOCAL
// @description General NBOSS/Angora modifications
// @namespace .
// @include https://nexus.ntteo.net/*
// @version 1
// @grant none
// ==/UserScript==

// variables to customize text template for Actions in view-task
window.call_template = 'Caller:\n \nReason:';
window.default_question_text = '';
window.default_email_text = '';
window.redirect_reason = 'Correct queue';
window.default_delegation_text = 'Dear Team,\n \nPlease take a look.\n \nThanks!';
window.delegate_customer_update = 'Dear Customer,\n \nThis ticket has been delegated to the corresponding team and you will receive an update shortly\n \nThanks and Kind Regards\n \nErik Requena \nNTT Communnications | Global Service Desk';
window.assign_reason = 'As discussed. Thanks!';
window.pending_reason = 'Pending Team Sub-Task';
window.hold_customer_update = 'Dear Customer,\n \nWe will set this ticket on hold until _TIME_ waiting for\n \nIf you have any queries, please do not hesitate to contact us back.\n \nThanks and Kind Regards,\n \nErik Requena \nNTT Communications | Global Service Desk';
window.hold_reason = '';
window.closing_comment = '';

// load GSD_Core.js
//$(document).ready(function(){$.getScript('https://gsd.ntt.eu/dev/modular/GSD_Core.js')});

// Runbook Overlay Switch
ovrunbook=true;

// Set pending everywhere
auto_click_on_set_pending=true;

// set to false to keep the original alert view
change_alert_view=true;

//// uncheck "Publish"
//be carefull, if you disable the script remember that the default is to publish
//USE AT YOU OWN RISK
uncheck_publish=true;

//// move "Alerts Requiring Attention" above "Scheduled Events"
change_noc_screen=false;

// add a call template to the Work Log?
addcalltemplate=true;

// default Time
if (typeof default_time_spent === 'undefined'){default_time_spent='5m';}
// text for the "Inbound Call" template
if (typeof call_template === 'undefined'){call_template='CALL SUMMARY\n********************\n\nCalled/Caller: \nReason: \n\n********************';}
// default comment for "Complete task". !!!!!! add "\n\" after each line!!!!!
if (typeof closing_comment === 'undefined'){closing_comment='';}
// default reason for "Hold"
if (typeof hold_reason === 'undefined'){hold_reason='hold reason template';}
// default customer update for "Hold". !!!!!! add "\n\" after each line!!!!!
if (typeof hold_customer_update === 'undefined'){hold_customer_update='Dear customer,\n\nThis request has been put on hold until _TIME_.\n\nRegards,\n';}
// default reason for "Pending"
if (typeof pending_reason === 'undefined'){pending_reason='';}
// default reason for "Assign"
if (typeof assign_reason === 'undefined'){assign_reason='As discussed. Thanks.';}
// default text when delegating
if (typeof default_delegation_text === 'undefined'){default_delegation_text='';}
// default customer update for "Delegate". !!!!!! add "\n\" after each line!!!!!
if (typeof delegate_customer_update === 'undefined'){delegate_customer_update='Dear customer,\n\nThis ticket has been passed to the corresponding team and you should receive an update shortly.\n\nRegards,\n';}
// default text when redirecting
if (typeof redirect_reason === 'undefined'){redirect_reason='Correct queue.';}
// default text for "Send 3rd PArty Email". !!!!!! add "\n\" after each line!!!!!
if (typeof default_email_text === 'undefined'){default_email_text='Dear customer,\n\n\n\nRegards,\n';}
// default text for "Ask Question". !!!!!! add "\n\" after each line!!!!!
if (typeof default_question_text === 'undefined'){default_question_text='Dear customer,\n\n\n\nRegards,\n';}

//GSD Network Services Handover notes template
net_ho_summary_temp='==================================================\nACTION REQUIRED NOTES:\n\n- **LIST REQUIRED ACTIONS HERE**\n\n==================================================\n!!!!!CAUTION!!!!!\n\n- **CAUTION TEXT GOES HERE**\n\n==================================================\nHANDY DATA:\n\nLCON Email: email@address.xxx\nLCON Phone: +00 **PHONE NUMBER**\n\nLCON AH: WEEKDAY, YEAR MONTH DAYth, between 00:00h-00:00h.\nLCON Current MW: WEEKDAY, YEAR MONTH DAYth, between 00:00h-00:00h.\n\nCARRIER TT#: **ADD CARRIER TICKET/S HERE**\n\n==================================================\nRELEVANT HISTORY SUMMARY:\n\n2016-JAN-07:\n- ** LIST SUMMARY HERE**\n\n==================================================\n';

//GSD Datacenter Admin Handover notes template
dca_ho_summary_temp='==================================================\nDCA TEMPLATE GOES HERE...\n==================================================\n';

team_dropdown_list_order=[
	'Partner',  //Santen IT
	'NTTE-AM First Line',
	'CSC 2 Support',
	'CSC 3 Support',
	'CSC Out of Hours',
	'NOC London',
	'CSC ITMS 2nd Line',
	'MS Storage Engineering',
	'MS Systems Engineering',
	'MS Network Engineering',
	'GSD Integrated Services FR',
	'GSD Integrated Services ES',
	'GSD Integrated Services DE',
	'GSD 24x7',
	'GSD Network Services',
	'GSD Pending RFO'
];

state_colors={
	'Complete': "lightgreen", // Old was green 008000
	'Active': "orange",
	'Needs Attention': "#FF6666", // Old was red FF0000
	'On Hold': "#A1A1A1", // Old was gray 808080
	'Pending': "#A1A1A1" // Old was gray 808080
}

internalexternal_colors={
	'Open (Customer)': "",
	'Internal': "red",
}

priority_colors={
	'0': "#bc00b3",
	'1': "#F00",
	'2': "#FE642E",
	'3': "#FAAC58",
	'4': "#F5DA81"
}

published_state_colors={
	'Internal': "red"
}

// Automatically click on 'Take Ownership'
// won't take ownership of a suspended alert
// WARNING ! can be dangerous
// BUG: if you release an alert it will take it back automatically
// WORKAROUND. to release an alert
// - ask someone else to take it from you,
//  - click on the release button, wait a bit but close the tab before the reply finishes loading
//  - clear it if possible
auto_take_ownership_unsafe=false










// function getUrl
function getUrlVars(url){
	var vars = [], hash,
			hashes = url.slice(url.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++){
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

// action and parameters from page url
base_url=window.location.href.slice(0,window.location.href.indexOf('?')+1)
params=getUrlVars(window.location.href)
action=params["action"];
id=params["id"];
current_user=$('#current-user').text();

// replace title (remove 'View Ticket - ')
if(action=="view-tickets" ){document.title=document.title.replace(/^View Ticket - /g, "");}

//sets "Force Ownership" button background in red and adds name of current owner
"view-tasks"==action&&(document.title=document.title.replace(/^View Task - /g,""),btnOwnership=$("input.nexus_button:first"),btnOwnership_text=btnOwnership.attr("value"),"Force Ownership"==btnOwnership_text&&(btnOwnership.css("background-color","red"),summary_trs=$("td.header_title:contains('-')").parents().eq(3).next(),ownership_td=summary_trs.find("th:first-child:contains('Ownership')").next(),owner_link=ownership_td.find("a:last-child"),btnOwnership.parent().append($("<span>&nbspOwned by&nbsp"),owner_link.clone(),$("&nbsp<span/>"))));
// Auto scroll down to actions
if ( typeof auto_scroll_down_to_actions === 'undefined' ) {	auto_scroll_down_to_actions = true }
function scrollToActions(){

	var tdActions;
	var header_title = document.getElementsByClassName('header_title');

	// find header_title which contains Actions and assign it to tdActions
	for(var i = 0; i < header_title.length; i++){
		if(header_title[i].innerText.match(/Actions/)){
			tdActions = header_title[i];
		}
	}

	// scroll down to Actions
	if ( window.location.href.indexOf("action=view-tasks") > -1 && auto_scroll_down_to_actions && tdActions != null ) { // != null is the same as !== null && !== undefined, double check
		window.scroll(0, tdActions.offsetParent.offsetTop);
	}

}

scrollToActions();










// view-tickets and view-tasks
if(action=="view-tickets" || action =="view-tasks"){

	//remove "Key to Highlighting" section
	$("td.header_title:contains('Key to Highlighting')").parents().eq(4).remove();

	var pubYes = document.querySelectorAll('#work-log table.data td:nth-last-child(4)');
	var logIcon = document.querySelectorAll('#work-log table.data td:nth-last-child(3) [href]');

	for (var ii = 0; ii < pubYes.length; ii++) {
		// change backgroundColor to td (Publish yes/no)
		if (pubYes[ii].textContent === "Yes") {
			pubYes[ii].style.backgroundColor = "lightgrey";
		} else {
			pubYes[ii].textContent = "";
		}
		// Add text symbols to Type
		var iconFlag = logIcon[ii].textContent; //    Cool Icons
		switch (iconFlag) {
			case "Portal Question":
				logIcon[ii].innerHTML += " <h2 align=center>?</h2>";break;
			case "Portal Response":
				logIcon[ii].innerHTML += " <h2 align=center><=</h2>";break;
			case "Portal Note":
				logIcon[ii].innerHTML += " <h2 align=center><=</h2>";break;
			case 'Outbound Mail':
				logIcon[ii].innerHTML += " <h2 align=center>@<br/>=></h2>";break;
			case "Inbound Mail":
				logIcon[ii].innerHTML += " <h2 align=center>@<br/><=</h2>";break;
			case "Outbound Call":
				logIcon[ii].innerHTML += " <h2 align=center>&#x260e;<br/>=></h2>";break;
			case "Inbound Call":
				logIcon[ii].innerHTML += " <h2 align=center>&#x260e;<br/><=</h2>";break;
		}
	}

	// get div which contains ticket main info
	summary_trs = $("td.header_title:contains('-')").parents().eq(3).next();
	// get 'Ticket Urg / Imp / Pri / CTI' next td
	ticket_urg_td=summary_trs.find("th:first-child:contains('Ticket Urg / Imp / Pri / CTI')").next();
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
	// get published state
	published_state = ticket_parent_td.text().match(/\(Published: (.*)\)/)[1];
	// change background color to 'Ticket / Parent' next td
	ticket_parent_td.css("background-color",  (published_state_colors[published_state] || "") );



	// change text in .remote-oss-message in case link 'GSD for ECL1.0 B-End Infra Provider' exists
	if ($(".remote-oss-message").length && $("a:contains('GSD for ECL1.0 B-End Infra Provider')").length) {
		//change height and width for yellow block
		$(".remote-oss-message > p:nth-child(1)").css({"height":"432px"});
		$(".remote-oss-message").css({"width":"85%"});
		//add specific text
		retext = "<div id='addText' style='text-align: left'><br/><span>This ticket has been escalated to us for another Service Provider (Customer Front)</span><div style='width: 20%;margin-left: 32%'>*****************************************************************<h3 style='width: 100%;margin-left: 40%;margin-top: 0;margin-bottom: 5px'>DO NOT PUBLIC UPDATE</h3>*****************************************************************</div>Phase 1: Collect information<br/><br/>Before start the investigation be sure that you have all the details, if not, use \'more info\' the below template to get all the information (ALWAYS INTERNAL) from the A-END:<br/><br/>&nbsp&nbsp&nbsp&nbspImpact/Issue overview:<br/>&nbsp&nbsp&nbsp&nbspWhen:<br/>&nbsp&nbsp&nbsp&nbspWhere (DC):<br/>&nbsp&nbsp&nbsp&nbsp\'VirtualRoom\' or \'GCV Service\' affected:<br/>&nbsp&nbsp&nbsp&nbspSystems and nicknames affected:<br/><br/>Phase 2: Triage<br/><br/>&nbsp&nbsp&nbsp&nbspCheck if there is a major outage related to EC on going.<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspIn that case inform A-end (ALWAYS INTERNAL)<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspInclude this ticket into the internal MI ticket<br/>&nbsp&nbsp&nbsp&nbspCheck if there are recently open (24-48 hours) alert tickets Priority 1 or 2 in the customer <a href='https://nexus.ntteo.net/angora-op-gui-eu?action=view-customers.ticketing&id=2892&block=3:7f' target='_blank'>NTT Enterprise Cloud (Europe) - Support Tab</a> related to the DC (UK, FR, ES, DE).<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspIn that case inform A-end (ALWAYS INTERNAL)<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspDelegate a task to the right Engineering Team adding the ticket to confirm that is related.<br/><br/>&nbsp&nbsp&nbsp&nbspIf no tickets related or outage, please delegate a subtask to the right Engineering Team, advising them to keep the updates internal in their subtask.<br/><br/>Confluence page: <a href='https://confluence.ntt.eu/x/a5-dH' target='_blank'>Procedure</a></div>";
		$(".remote-oss-message > p:nth-child(1)").append(retext);
		//scroll to top
		window.scrollTo(0,0);
	}

}













// My Work page
if( action == "my-work" ){

	// hide by default
	$("td.header_title:contains('Sorting')").parents().eq(3).next().toggle();
	$("td.header_title:contains('Watched Tickets')").parents().eq(3).next().toggle();
	$("td.header_title:contains('Team's Tasks: Active')").parents().eq(3).next().toggle();
	$("td.header_title:contains('Team's Tasks: On Hold')").parents().eq(3).next().toggle();
	$("td.header_title:contains('Team's Tasks: Delegated')").parents().eq(3).next().toggle();
	$("td.header_title:contains('Team's Tasks: Pending')").parents().eq(3).next().toggle();

	// change background-color to td with Internal Type in Needing Attention section
	$("td.header_title:contains('Needing Attention')").parents().eq(3).next().find("td:nth-child(2):contains('Internal')").css({'background-color':'red'});

	// table header of Needing Attention section
	table_header=$("td.header_title:contains('Needing Attention')").parents().eq(3).next().find("tr:first-child");
	// table header of Delegated section
	table_header2=$("td.header_title:contains('Delegated')").parents().eq(3).next().find("tr:first-child");

	//order of teams in the "my work" view
	if (typeof team_order === 'undefined'){team_order=[
		'GSD Santen Global Help Desk',
		'GSD Datacenter Admin',
		'GSD Enterprise Cloud Support',
		'GSD NTT Com Security',
		'GSD ITMS',
		'GSD 24x7',
		'GSD Integrated Services ES',
		'GSD Integrated Services FR',
		'GSD Integrated Services DE',
		'GSD Network Services',
		'GSD Pending RFO',
		'CSC BNS QA'
	]};
	team_order_delegate=[
		'Partner Santen',
		'NTTE Datacenter',
		'NTTEO PSM'
	];
    if ( typeof team_colors === 'undefined' ) {
    	team_colors = {
    		'GSD Santen Global Help Desk': "#F781BE",//"#66CCFF"
    		'GSD Datacenter Admin': "linear-gradient(silver, white, silver)",
    		'GSD Enterprise Cloud Support': "linear-gradient(#D4A017,gold, #D4A017)",
    		'GSD 24x7': "orange",
    		'GSD Integrated Services ES': "red",
    		'GSD Integrated Services FR': "#9494FF",
    		'GSD Integrated Services DE': "yellow",
    		'GSD Network Services': "#C2A584",
    		'GSD Pending RFO': "#E9C969"
    	};
    }

	// Team Sorting in "Needing Attention" section
	$.each(team_order.reverse(),function(a,b){selected_tasks_trs=$("td.header_title:contains('Needing Attention')").parents().eq(3).next().find("td:nth-child(5):contains('"+b+"')").parent(),selected_tasks_trs&&table_header.after(selected_tasks_trs)});

	// Team Sorting in Delegation section
	$.each(team_order_delegate.reverse(),function(a,b){selected_tasks_trs2=$("td.header_title:contains('Delegated')").parents().eq(3).next().find("td:nth-child(6):contains('"+b+"')").parent(),selected_tasks_trs2&&table_header2.after(selected_tasks_trs2)});

	// colors for teams and priority
	for (team in team_colors) {
		$("td.header_title:contains('Needing Attention')").parents().eq(3).next().find("td:nth-child(5):contains('" + team + "')").css("background", team_colors[team]);
		$("td.header_title:contains('Watched Tickets')").parents().eq(3).next().find("td:nth-child(7):contains('" + team + "')").css("background", team_colors[team]);
		$("td.header_title:contains('Tasks Owned by You')").parents().eq(3).next().find("td:nth-child(5):contains('" + team + "')").css("background", team_colors[team]);
		$("td.header_title:contains('Active')").parents().eq(3).next().find("td:nth-child(5):contains('" + team + "')").css("background", team_colors[team]);
		$("td.header_title:contains('On Hold')").parents().eq(3).next().find("td:nth-child(6):contains('" + team + "')").css("background", team_colors[team]);
		$("td.header_title:contains('Delegated')").parents().eq(3).next().find("td:nth-child(6):contains('" + team + "')").css("background", team_colors[team]);
		$("td.header_title:contains('Pending')").parents().eq(3).next().find("td:nth-child(6):contains('" + team + "')").css("background", team_colors[team]);
	}
	// add color to priority td
	for (priority in priority_colors) {
		$("td.header_title:contains('Tasks Owned by You')").parents().eq(3).next().find("td:nth-child(7):contains('" + priority + "')").css("background-color", priority_colors[priority]);
		$("td.header_title:contains('Watched Tickets')").parents().eq(3).next().find("td:nth-child(10):contains('" + priority + "')").css("background-color", priority_colors[priority]);
		$("td.header_title:contains('Needing Attention')").parents().eq(3).next().find("td:nth-child(7):contains('" + priority + "')").css("background-color", priority_colors[priority]);
		$("td.header_title:contains('Active')").parents().eq(3).next().find("td:nth-child(8):contains('" + priority + "')").css("background-color", priority_colors[priority]);
		$("td.header_title:contains('On Hold')").parents().eq(3).next().find("td:nth-child(8):contains('" + priority + "')").css("background-color", priority_colors[priority]);
		$("td.header_title:contains('Delegated')").parents().eq(3).next().find("td:nth-child(9):contains('" + priority + "')").css("background-color", priority_colors[priority]);
		$("td.header_title:contains('Pending')").parents().eq(3).next().find("td:nth-child(8):contains('" + priority + "')").css("background-color", priority_colors[priority]);
	}


	//Highlight  Angora/Nexus updates in tickets owned
	$("td.header_title:contains('Tasks Owned by You')").parents().eq(3).next().find("td:nth-child(9):contains('Angora')").css("background","#FF6666");
	$("td.header_title:contains('Tasks Owned by You')").parents().eq(3).next().find("td:nth-child(9):contains('Nexus')").css("background","#FF6666");

}










// highlight your own name in the alert history
if((action=="view-alerts" || action=="alert-retest")){
	$("td.header_title:contains('History')").parents().eq(3).next().find('td:nth-child(1):contains("'+current_user+'")').css("background-color","#BED4F2")
}

// view-alerts alert-retest
if(change_alert_view && (action=="view-alerts" || action=="alert-retest")){

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
	tr.appendTo(table)

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
	right_side.appendTo(td)
	//move test results to the top
	test_results_div=$(".section_content:contains('Retest') > div:only-child")
	if (test_results_div) test_results_div.parents().eq(0).prependTo(page_contents)
	//move "clear", "retest", etc buttons to the top
	alert_action_td=$("td[class='alert-action']")
	if(alert_action_td) alert_action_td.parents().eq(4).prependTo(page_contents)
	alert_tools_td=$("td[class='alert-tools']")
	if(alert_tools_td) alert_tools_td.parents().eq(4).prependTo(page_contents)

	//move support notes div
	$("td.header_title:contains('Support Notes')").parents().eq(4).insertAfter($("td.header_title:contains('AL-EU')").parents().eq(4))

	// Firewall and Op5 Highlight by Juan Olivar
	if ($("#left_table").text().toLowerCase().indexOf("failover") > -1) {
		page_contents.css("background-color","yellow"),page_contents.css("background-image","url('https://img.imgur.com/guRgNpz.png')"),$("input[value='Retest']").hide(),$("input[value='Run Diagnostics']").hide(),$("input[value='Clear']").hide(),$("input[value='Suppress']").hide(),$("input[value='Create Ticket']").css("font-weight","bold"),$("td.row2:contains('HA failover')").append(" - Create ticket and investigate").css({"background-color":"yellow","font-size":"18px","font-weight":"bolder"});
	}
	if ($("#left_table").text().toLowerCase().indexOf("op5") > -1) {
		page_contents.css("background-color","white"),page_contents.css("background-image","url('http://i.imgur.com/gahqelS.jpg')"),page_contents.css("background-position","0px -180px"),$("input[value='Retest']").hide(),$("input[value='Run Diagnostics']").hide(),$("input[value='Suppress']").hide(),$("input[value='Create Ticket']").css("font-weight","bold"),$("td.row2:contains('[op5]')").append(" - Bear in mind this Alert was injected from OP5").css("font-weight","bold");
	}
	if ($("#left_table").text().toLowerCase().indexOf("has taken over this node") > -1) {
		page_contents.css("background-color","#f5f5f5"),page_contents.css("background-image","url('http://i.imgur.com/kPPl5d5.png')"),page_contents.css("background-repeat","no-repeat"),page_contents.css("background-position","345px 73px"),$("input[value='Retest']").hide(),$("input[value='Run Diagnostics']").hide(),$("input[value='Clear']").hide(),$("input[value='Suppress']").hide(),$("input[value='Create Ticket']").css("font-weight","bold"),$("td.row2:contains('not OK')").append(" - Node Takeover - Create ticket and investigate").css({"font-size":"18px","font-weight":"bolder"});
	}

}










//put color on subtasks
subtask_table_section = $("td.header_title:contains('Direct Subtasks')");
//colorise task state
if(subtask_table_section) {
	subtask_table_tr = subtask_table_section.parents().eq(3).next();
	for(state in state_colors){
		subtask_table_tr.find("td:first-child:contains('"+state+"')").css("background-color", state_colors[state] )
	}
}

// uncheck "Publish" everywhere
if(uncheck_publish){$( "input[name*='publish']" ).attr('checked', false)}

// Check pending everywhere
if (auto_click_on_set_pending){$( "input[name*='pending']" ).attr('checked', true)}
else {$( "input[name*='pending']" ).attr('checked', false)}

// Per tab task actions by Juan Olivar
if (action == "view-tasks") {
	// Add default time spent everywhere
	$("input[name*='spent']").val(default_time_spent);
	// Check continue work
	$("input[name='dbfield:4:__raw_custom__:__single__:log_work_continue_work:newval']").attr('checked', true);
	// Tab "Complete Task"
	// set clear handover note
	$("input[name='dbfield:4:__raw_custom__:__single__:complete_task_clear_handover_note:newval']").attr('checked', true);
	// Tab "Hold"
	// set hold reason
	$("textarea[name='dbfield:3:__raw_custom__:__single__:on_hold_reason']").val(hold_reason);
	// set hold customer update
	$("textarea[name='dbfield:3:__raw_custom__:__single__:on_hold_customer_update']").val(hold_customer_update);
	// Tab  "Assign"
	// set assign reason
	$("textarea[name='dbfield:3:__raw_custom__:__single__:assign_reason']").val(assign_reason);
	// Tab "Delegate"
	// summary when delegating
	summary_trs = $("td.header_title:contains('-')").parents().eq(3).next();
	subtask_summary = summary_trs.find("th:first-child:contains('Task Summary')").next().text();
	$("input[name='dbfield:3:__raw_custom__:__single__:delegate_summary']").val(subtask_summary);
	// set delegation details text
	$("textarea[name='dbfield:3:__raw_custom__:__single__:delegate_details']").val(default_delegation_text);
	// set delegate customer update
	$("textarea[name='dbfield:3:__raw_custom__:__single__:delegate_customer_update']").val(delegate_customer_update);
	// Uncheck Skip Customer Update
	$("input[name='dbfield:4:__raw_custom__:__single__:delegate_skip_update:newval']").attr('checked',false);
	// check set pending
	if (auto_click_on_set_pending) {
		$("input[name='dbfield:4:__raw_custom__:__single__:delegate_set_pending:newval']").attr('checked', true);
	}
	// Tab "Redirect"
	// set redirect reason
	$("textarea[name='dbfield:3:__raw_custom__:__single__:redirect_reason']").val(redirect_reason);
	// Tab "Add Change Request"
	// uncheck check pending change
	$("input[name='dbfield:4:__raw_custom__:__single__:change_request_set_pending:newval']").attr('checked', false);

	// Tab "Set Pending"
	if (auto_click_on_set_pending) {
		// check pending
		$("input[name='dbfield:4:__raw_custom__:__single__:set_pending_subtask:newval']").attr('checked', true);
		$("input[name='dbfield:4:__raw_custom__:__single__:set_pending_change:newval']").attr('checked', true);
		$("input[name='dbfield:4:__raw_custom__:__single__:set_pending_response:newval']").attr('checked', true);
		// set pending reason
		$("textarea[name='dbfield:3:__raw_custom__:__single__:set_pending_reason']").val(pending_reason);
	}
	// Tab "Send 3rd Party Email"
	// summary when delegating
	subject_trs = $("td.header_title:contains('-')").parents().eq(3).next();
	subject_line = subject_trs.find("th:first-child:contains('Task Summary')").next().text();
	$("input[name='dbfield:3:__raw_custom__:__single__:subject']").val(subject_line);
	// set email details text
	$("textarea[name='dbfield:3:__raw_custom__:__single__:email_details']").val(default_email_text);
	// Tab "Ask Question"
	// default question
	$("textarea[name='dbfield:3:__raw_custom__:__single__:ask_question_question']").val(default_question_text);
	// Tab "Log Work"
	// Add a template for phone calls.
	if (addcalltemplate) {
		$("select[name='dbfield:3:__raw_custom__:__single__:log_work_type']").change(function() {
			$("textarea[name='dbfield:3:__raw_custom__:__single__:log_work_work_log']").text(call_template); //change the textbox
		});
	}

	// reorder dropdown list for team selector
	selectDelegate = $("select[name='dbfield:3:__raw_custom__:__single__:delegate_team']")
	if (selectDelegate.length == 1) {
		$.each(team_dropdown_list_order.slice(0).reverse(), function(index, team) {
			options = selectDelegate.find("option:contains('" + team + "')");
			selectDelegate.prepend(options.clone());
		});
		selectDelegate.find("option:contains('NTTE-AM First Line'):first").attr("selected", "selected");
	}
	selectRedirect = $("select[name='dbfield:3:__raw_custom__:__single__:redirect_team']")
	if (selectRedirect.length == 1) {
		$.each(team_dropdown_list_order.slice(0).reverse(), function(index, team) {
			options = selectRedirect.find("option:contains('" + team + "')");
			selectRedirect.prepend(options.clone());
		});
		selectRedirect.find("option:contains('NTTE-AM First Line'):first").attr("selected", "selected");
	}

	// EC Incident Highlight
	if($(".remote-oss-message").length&&$("td a:contains('Netmagic Monitoring Team')").length){var ECWarn=document.createElement("P");ECWarn.innerHTML="If this tak is about an EC incident, inform affected customers following: <a href='https://confluence.ntt.eu/x/8gAZI' target='_blank'>Handling Enterprise Cloud Infrastructure Incidents</a>",ECWarn.id="EcWarnid",$(".header_title:contains('Actions')").parent().parent().parent().parent().parent().prepend(ECWarn),$("#EcWarnid").css({width:"100%","line-height":"30px",height:"30px","text-align":"center","vertical-align":"middle",color:"black","background-color":"orange","font-weight":"bold"})}


}










//move Alerts section above Scheduled Events
if (change_noc_screen && action == "noc") {
	$("td.header_title:contains('Alerts Requiring Attention')").parents().eq(4).insertBefore($("td.header_title:contains('Scheduled Events')").parents().eq(4))
}
if (action == "noc") {
	$("td.header_title:contains('Tickets requiring action')").parents().eq(4).hide()
}
if (action == "view-alerts" && auto_take_ownership_unsafe) {
	state_td = $("th:first-child:contains('Alert/Response/State')").next()
	state = state_td.text().split(" / ")[2]
	if (state == "Active") {
		$('input[value="Take Ownership"]').click()
	}
}

//Runbook Highlight by Juan Olivar
if (action == "view-alerts" || action == "alert-retest") {
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

// Real Time Ticket List Search - by Marcos Sandoval
if (action == "add-alert-to-ticket") {
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
	$("td.header_title:contains('Add to Ticket')").append(' - &#128270; Search <input type="text" id="searchBox" autofocus="autofocus" onkeyup="searchInTickets()">');
}

// ||||||||||||||||||||||||||||||||||||||||||||||||
// |||||||||||||| SNIPPETS SECTION ||||||||||||||||
// ||||||||||||||| ADD THEM BELOW |||||||||||||||||
// ||||||||||||||||||||||||||||||||||||||||||||||||



// Add cpe # to ticket summary when creating ticket by Juan Olivar
"create-customer-ticket-follow"==action&&(navb=$("a:contains('cpe')").text(),cpes=navb.match(/cpe([^ ]+)/g),$("input[name='dbfield:3:__raw_custom__:__single__:summary']").val(cpes));

// Collapse/Uncollapse email rows by Jonathan Guillen #script001fun
if("view-tickets"==action||"view-tasks"==action){var i=0;$("td a:contains('Portal Response'), a:contains('Outbound Mail'), a:contains('Inbound Mail')").parent().next().each(function(){this.id||(this.id="class1cell"+i);var e=this.innerHTML;if(-1==e.indexOf("From: ")||e.indexOf("From: ")>e.indexOf("To: "))if(-1==e.indexOf("To: "))var t="",s="",n="",l="",c="",d="";else{var s="",t=e.split("To: ",2);if(-1==e.indexOf("Cc: ")||e.indexOf("Cc: ")>e.indexOf("Subject: "))var l="",n=t[1].split("Subject: ",2),c=n[1].split("<br><br>",5);else var n=t[1].split("Cc: ",2),l=n[1].split("Subject: ",2),c=l[1].split("<br><br>",5)}else{var t=e.split("From: ",2),s=t[1].split("To: ",2);if(-1==e.indexOf("Cc: ")||e.indexOf("Cc: ")>e.indexOf("Subject: "))var n=s[1].split("Subject: ",2),c=n[1].split("<br><br>",5);else var n=s[1].split("Cc: ",2),l=n[1].split("Subject: ",2),c=l[1].split("<br><br>",5)}if(""!=c){this.innerHTML="";var r=document.createElement("DIV"),p=document.createElement("DIV"),h=document.createElement("BUTTON"),o=document.createElement("BUTTON"),b=document.createElement("P"),f=document.createElement("P");if(r.id="div"+i,p.id="sumdiv"+i,b.id="p"+i,f.id="sump"+i,h.id="butshow"+i,o.id="buthide"+i,h.innerHTML="Show",o.innerHTML="Hide",h.addEventListener("click",function(){$(this).next().next().css("display","block").css("width","426px"),$(this).next().next().next().css("display","none"),$(this).css("display","none"),$(this).next().css("display","initial")}),o.addEventListener("click",function(){$(this).next().css("display","none"),$(this).next().next().css("display","block").css("width","426px"),$(this).css("display","none"),$(this).prev().css("display","initial")}),this.appendChild(h),this.appendChild(o),this.appendChild(r),this.lastChild.appendChild(b),b.innerHTML=e,this.appendChild(p),this.lastChild.appendChild(f),""!=s)if(0==s[0].indexOf('"')){s[0]=s[0].slice(1,-4);var x=s[0].indexOf(" ");d=s[0].slice(0,x-1)+" --> "}else if(0==s[0].indexOf("&lt;")){s[0]=s[0].slice(4,-3);var x=s[0].indexOf(" ");d=s[0].slice(0,x-4)+" --> "}else d=s[0]+" --> ";else d="NTT EU --> ";var u=n[0];for(u=u.replace(/<br\s*[\/]?>/gi," "),u=u.replace(/\t/gi,""),u=u.replace(/&lt;/gi,""),u=u.replace(/&gt;/gi,""),u=u.replace(/,/gi,""),u=u.replace(/;/gi,""),u=u.replace(/"/gi,""),u=u.replace(/\'/gi,""),u=u.toLowerCase(),u=u.split(" "),a=0;a<u.length;a++)u[a]!=u[a-1]&&u[a].indexOf("@")>-1&&(d+=u[a],a+2<u.length&&(d+=", ")),a==u.length-1&&u.length>1&&(d+="<br/>");d+="<br/>";var v="";c[1]?v+=c[1].replace(/<br>/gi,"")+" ":"",c[2]?v+=c[2].replace(/<br>/gi,"")+" ":"",c[3]?v+=c[3].replace(/<br>/gi,"")+" ":"",c[4]?v+=c[4].replace(/<br>/gi,"")+" ":"",v.length>350?(d+=v.slice(0,350),d+="..."):d+=v,f.innerHTML=d}$("#div"+i).css("display","none"),$("#sumdiv"+i).css("width","426px"),$("#buthide"+i).css("display","none"),i++})}

////Large tickets handover notes add SUMMARY TEMPLATE by Jonathan Guillen #script000fun
"view-tasks"==action&&($("input[name='dbfield:3:__raw_custom__:__single__:log_work_time_spent']").val(default_time_spent),$("input[name='dbfield:4:__raw_custom__:__single__:continue_work:newval']").attr("checked",!0),$(document).ajaxComplete(function(){var _=$("a[style='background-color: yellow;']").text();if("Log Handover"==_){var e=$("th.row2:contains('Ownership')").next().html();""==document.getElementsByName("dbfield:3:__raw_custom__:__single__:handover_log")[0].value&&(e.indexOf("GSD Network Services")>-1&&$("textarea[name='dbfield:3:__raw_custom__:__single__:handover_log']").val(net_ho_summary_temp),e.indexOf("GSD Datacenter Admin")>-1&&$("textarea[name='dbfield:3:__raw_custom__:__single__:handover_log']").val(dca_ho_summary_temp))}}));

//--------Highlight Boehringer customer in "My-Work" view - By Jonathan Guillen ------||
"my-work"==action&&($("td a:contains('Boehringer')").parent().siblings().css("background-color","#F5A9E1"),$("td a:contains('Boehringer')").parent().css("font-weight","bold"),$("td a:contains('Boehringer')").parent().css("padding","0px"),$("td a:contains('Boehringer')").parent().each(function(){var n="<div style='border:7px solid #F5A9E1; color:#FA5882; padding:5px; padding-top:15px'>";n+=this.innerHTML,n+="<br/><p>PLEASE, GIVE PRIORITY!!</p></div>",this.innerHTML=n}));

// Runbook Overlay
if(ovrunbook){$("div.task_action_content").css("position","relative"),$("head").append("<style>.b-popup-content{margin:20px auto 0;width:550px;height:310px;padding:10px;background-color:#f5f5f5;border-radius:5px;box-shadow:0 0 10px #000;}.popupTextarea{display:none;width:99%; height:180px;border: 1px solid black;border-radius:2px;}.runbookYes{margin: 3px 2px 3px 22%;display:inline-block;border:1px solid #BFBFBF;color:#8C8C8C;border-radius:20px;-webkit-border-radius:20px;-moz-border-radius:20px;font-family:Verdana;width:auto;height:auto;font-size:16px;padding:10px 40px;background-color:#FCFAF9}.runbookYes:active,.runbookYes:hover{border:1px solid #BFBFBF;color:#1CD100;background-color:#E8E8E8}.runbookNo{display:inline-block;border:1px solid #BFBFBF;color:#8C8C8C;border-radius:20px;-webkit-border-radius:20px;-moz-border-radius:20px;font-family:Verdana;width:auto;height:auto;font-size:16px;padding:10px 40px;background-color:#FCFAF9}.runbookNo:active,.runbookNo:hover{border:1px solid #BFBFBF;color:#ED0202;background-color:#E8E8E8}.runbookGo{display:none;width: 56%;height: 40px;margin: -5px 0px 9px 22%;font-size: 20px;}.popupQuestion{font-size:20px; color:black;margin:0 0 0 7%;text-transform: uppercase;text-align: center;}#transp {position:absolute;top:0;left:0;background: rgba(0,0,0,.5);width:100%;height:100%;z-index:10;}</style>");var runbook=$('td:contains("Runbook:")'),frow=$("#work-log tr.row1:first").text();runbook.length&&-1!=frow.indexOf("Changed Category")&&($("#complete-task").after('<div id = "transp"></div>'),$(".task_action_tabs").hide(),$("[value=Release Ownership]").hide().after('<span class="re">Confirm Runbook Execution</span>'),$("#transp").html("<div class='b-popup-content'><p class='popupQuestion'>Has the runbook been followed?</p><button class='runbookYes'>&#10004; | YES</button><button class='runbookNo'>&#x2718; | NO</button><br/><textarea class='popupTextarea'></textarea><br/><button class='runbookGo'>Log Runbook Execution</button></div>")),$(".runbookYes").click(function(){$(".popupTextarea").val("Runbook Executed:\n\n").show("slow"),$(".runbookGo").show("slow")}),$(".runbookNo").click(function(){$(".popupTextarea").val("Runbook NOT Executed:\n\n").show("slow"),$(".runbookGo").show("slow")}),$(".runbookGo").click(function(){$(".task_action_tabs").show("slow"),$("#transp").hide("slow"),a=$(".popupTextarea").val(),$('textarea[name="dbfield:3:__raw_custom__:__single__:log_work_work_log"]').val(a),$('input[name="dbfield:3:__raw_custom__:__single__:log_work_time_spent"]').val("3m"),$("[value=Log Work]").click()})}

if( // view-tasks
window.location.href.indexOf("action=view-tasks") > -1 ){
	// Set customized text to Complete Task
	$("textarea[name='dbfield:3:__raw_custom__:__single__:complete_task_comment']").val(closing_comment);

	if ( typeof email_set_pending === 'undefined' ) {	email_set_pending = true };
	if ( typeof delegate_set_pending === 'undefined' ) {	delegate_set_pending = true };
	if ( typeof ask_question_set_pending === 'undefined' ) {	ask_question_set_pending = true };

	try{

		// Send 3rd Party Email (Set Task to Pending Response) - uncheck
		if(email_set_pending){
			document.getElementsByName('dbfield:4:__raw_custom__:__single__:email_set_pending:newval')[0].checked = true;
		}else{
			document.getElementsByName('dbfield:4:__raw_custom__:__single__:email_set_pending:newval')[0].checked = false;
		}

		// Delegate (Set Task to Pending Subtask) - uncheck
		if(delegate_set_pending){
			document.getElementsByName('dbfield:4:__raw_custom__:__single__:delegate_set_pending:newval')[0].checked = true;
		}else{
			document.getElementsByName('dbfield:4:__raw_custom__:__single__:delegate_set_pending:newval')[0].checked = false;
		}

		// Ask Question (Set Task to Pending Response) - uncheck
		if(ask_question_set_pending){
			document.getElementsByName('dbfield:4:__raw_custom__:__single__:ask_question_set_pending:newval')[0].checked = true;
		}else{
			document.getElementsByName('dbfield:4:__raw_custom__:__single__:ask_question_set_pending:newval')[0].checked = false;
		}

	}catch(e){
		console.log('Errors in Action section. Ask Question can not be found.');
	}

}

if(action =="view-tasks" && $("td a:contains('Dimension Data Belgium [Umicore]'):first").parent().prev().text()=="Related"){
    var umicoreWarning=document.createElement("P");
    umicoreWarning.innerHTML="If ticket is opened from the customer, follow system support notes. If ticket was created from alert(s), follow the runbook.";
    umicoreWarning.id="umiWarn";

    $(".header_title:contains('Actions')").parent().parent().parent().parent().parent().prepend(umicoreWarning);
    $("#umiWarn").css({"width":"100%","line-height":"35px","height":"35px","text-align":"center","vertical-align":"middle","color":"black","background-color":"red","font-weight":"bold"});
}

// Display notification above Actions if the customer is H & M HENNES & MAURITZ PORTAL
// Created by Jonathan Guillen
// Customized by Yevgen Prushynskyy
if(action =="view-tasks" && $("td a:contains('H & M HENNES & MAURITZ PORTAL'):first").parent().prev().text()=="Related"){

	// create p element, add content and assign an id
	var hmHennesWarning=document.createElement("P");
	hmHennesWarning.innerHTML="For this customer, follow  Configuration Item Support Notes above. More info in <a href='https://confluence.ntt.eu/x/ONAwHw' target='_blank'>Confluence</a>";
	hmHennesWarning.id="hmHennesWarn";

	// prepend created element to Actions
	$(".header_title:contains('Actions')").parent().parent().parent().parent().parent().prepend(hmHennesWarning);
	$("#hmHennesWarn").css({"width":"100%","line-height":"30px","height":"30px","text-align":"center","vertical-align":"middle","color":"white","background-color":"black","font-weight":"bold"});
}



// Prevent Critical NS Ticket releaase
"view-tasks"==action&&(tdurg=$("td.header_title:contains('-')").parents().eq(3).next(),cururg=tdurg.find("th:first-child:contains('Ticket Urg / Imp / Pri / CTI')").next().text(),$("td a:contains('GSD Network Services')").length&&cururg.indexOf("Critical")>-1&&$("Release Ownership"==btnOwnership_text)&&btnOwnership.css("background-color","red").parent().append(" Critical ticket, do NOT release it, assign it. "));

/*
// change name from CSC to ESBU Ops
try {
	function changeLinkText(input, output) {

		// function to reduce code in changeLinkText() function
		function _ForSwitch(a) {

			// loop through the argument1
			for(var i = 0; i < a.length; i++) {
				//change the innerText of argument1
				switch(a[i].innerText) {
					case input:
						a[i].innerText = output;
						break;
					default:
				}
			}
		}

		if( // view-tickets
			window.location.href.indexOf("action=view-tickets") > -1) {

			// get list of links
			var links = document.getElementsByTagName('a');
			_ForSwitch(links);

		} else if( // view-tasks
			window.location.href.indexOf("action=view-tasks") > -1) {

			var links = document.getElementsByTagName('a');
			_ForSwitch(links);
			try {
				var delegateList = document.getElementsByName('dbfield:3:__raw_custom__:__single__:delegate_team')[0];
				var redirectList = document.getElementsByName('dbfield:3:__raw_custom__:__single__:redirect_team')[0];

				_ForSwitch(redirectList.children);
				_ForSwitch(delegateList.children);
			} catch(e) {
				console.error('Actions are not found.');
			}


		} else if( // NOC View
			window.location.href.indexOf("action=noc") > -1) {

			// find div "Scheduled Events due in the next 4 hours" and assign it to divCrs
			var divCrs;
			for(var l = 0; l < document.getElementsByClassName('section_content').length; l++) {
				if(!!document.getElementsByClassName('section_content')[l].getElementsByClassName('header_title')[0].innerText.match(/Scheduled Events due in the next 4 hours/)) {
					divCrs = document.getElementsByClassName('section_content')[l];
					break;
				}
			}

			// get list of links
			var links = divCrs.getElementsByTagName('a');

			_ForSwitch(links);

		}

	}

	changeLinkText('CSC 2 Support', 'ESBU Ops 2');
	changeLinkText('CSC 3 Support', 'ESBU Ops 3');
	changeLinkText('CSC Out of Hours', 'ESBU Ops Out of Hours');
	changeLinkText('NOC London', 'NSBU Ops');

} catch(e) {
	console.log('Can not change name to ESBU Ops');
}
*/

try{
	// multisearch, improved search, sid
	if(	window.location.href.indexOf("action=create-customer-ticket-follow") > -1 || window.location.href.indexOf("action=edit-tickets") > -1  || (window.location.href.match(/angora-op-gui-eu$/) && document.getElementsByName('FPAR_cr_cis__notsel')[0] !== undefined)){

		let SID_list;
		let SID_search;
		let SID_search_value;
		let SID_regex;
		let i;

		// assign SID_list depending of existed elements on the page
		if(window.location.href.indexOf("action=create-customer-ticket-follow") > -1 || window.location.href.indexOf("action=edit-tickets") > -1){
			SID_list = document.getElementsByName('FPAR_related_configuration_items__notsel')[0].children;
			SID_search = document.getElementsByName('FPAR_related_configuration_items__filter')[0];
			// change note to MultiSearch example: eua2400063 evx, sid-eu-00199272
			document.getElementById('FPAR_related_configuration_items__lfmsg').innerText = 'MultiSearch example: eua2400063 evx, sid-eu-00199272';
		}else{
			SID_list = document.getElementsByName('FPAR_cr_cis__notsel')[0].children;
			SID_search = document.getElementsByName('FPAR_cr_cis__filter')[0];
			// change note to MultiSearch example: eua2400063 evx, sid-eu-00199272
			document.getElementById('FPAR_cr_cis__lfmsg').innerText = 'MultiSearch example: eua2400063 evx, sid-eu-00199272';
		}

		// remove default search behaviour for SID_search
		SID_search.removeAttribute('onkeyup');

		// add new multisearch behaviour for SID_search
		SID_search.addEventListener('keyup', () => {

			SID_search_value = SID_search.value;

			if(SID_search_value.match(/SID/ig)){
				// replace all non word character except \- into space ' '
				SID_search_value = SID_search_value.replace(/\W[\W\-]+/g, ' ');
				// convert the string into (SID-ID-12345678, SID-ID-12345678).*
				SID_search_value = '(' + SID_search_value.replace(/ /g, '|') + ').*';
			}else{
				// replace all non word character into space ' '
				SID_search_value = SID_search_value.replace(/\W+/g, ' ');
				// convert the string into (evx|eux|evw).*
				SID_search_value = '(' + SID_search_value.replace(/ /g, '|') + ').*';
			}

			SID_regex = new RegExp(SID_search_value, 'i');

			// show/hide SID if match a new RegExp
			for (i = 0; i < SID_list.length; i++) {
				SID_regex.exec(SID_list[i].innerText) ? SID_list[i].style.display = "block" : SID_list[i].style.display = "none";
			}

		});

	}
}catch(e){
	console.error('Error in MultiSearch injection.');
}

// Open djchat
//document.cookie.indexOf("djchat=")>-1||(window.open("https://chat.gsd.ntt.eu/index.html?jid=24x7","pjchat","width=500,height=360"),document.cookie="djchat=true;path=/");

// $.post( "https://gsd.ntt.eu/backend/coreuse.php", current_user  );

console.log('GSD_Core.js has been loaded...');