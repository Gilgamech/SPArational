/*
Stratonimbus Serverless Webhost;

- Focus on existing pages loop for now, BYOPage is secondary loop.
Upload page;
1. Field to load external webpage's source to HTML box.
- Remove "Load Page" button.
1a. Dropdown with "External Page" and the user's pages, to select which is being edited.;
- Needs the DB page that would supply it, and an API call to access.
- Dropdown also populates JSON box?
2. Page Editor;
- Div to foreach the selected element's items.
- Update in DB until #4 is working.
- Onclick to foreach the element's items;
- Drag to rearrange?
2a. Converter to convert from HTML box to JSON box.
- Readd and make work, improve...
3.Uploader;
- Move Upload button to top of page then connect to uploaders;
- Troubleshoot;

Don't pile a crapload of unreadable code in the button. Keep it simple - a button has a function as onclick/onwhatever, function lives in a JS file, etc.
Half of the mud you're walking through is the YAGNI from the last time you felt clever. Choose the option that makes future options easier to choose between.;

Declarative layer is static and can be used in buttons. 
Imperative layer is dynamic and shouldn't be used in buttons.



  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");



*/

/*
StratoNimbus Get and Post transforms are expressed as Sparational code and result in ThoriumRocket pages.
Develop applications as Sparational code items, PUT these to a StratoNimbus server, and Get will return a payload on the ThoriumRocket.
Sparational SPA framework 
- Allows you to write single-page applications live in the browser.
- Set of agreements:
API calls will have an answer.
- Server sends URLs in the programmatic code whose query strings match up to the table columns.
- Could randomize the query string variables on each pageload and store the glue piping in a db or something.
Domains and paths link to Applications, which are assembled from Divs
- Some pages have many tabs. Each tab is just a big DIV that hides the others
Read data by GET, write data by POST
Transform data at server and at browser
-- At browser: Write webparts (or whole pages) in your favorite flavor of Javascript.
-- i.e.browser will update element with GET from a specified URL every X instances (seconds/event/have a way to call from other code)
-- At server: Specify and upload operations in Approved Javascript to be run when data is sent or received. 
-- i.e. server will increment the requested value on every every X instances of GET (seconds/event/have a way to call from other code)
Pretend to be a real task scheduler, but because it's serverless you'll just do it on the next request.
-- function taskScheduler --> foreach(list) --> if (Date.now() >= list.runattime && list.state < 1) { performAction(list.action)} 
States: 0 deleted 1 disabled 2 ready 
StratoNimbus serverless webserver
- Allows easy updating of values 
ThoriumRocket browser engine
- Programmatic website generator


Customer workflow
- Get a Gilgamech Login
- Upload files, get DNS subdomain.
- Move DNS, can use their own domain. (Can't do this on Heroku. That one can only be an S3 cache. Will have to have one somewhere else to be a router.)
- Upgrade to the $1/mo plan
- Enable SSL (Need to, like, figure that out)
- Use Divinator to build divs that call URLs. (Builder page just got a name and a refocus)
- Use SiteOfHand to assmeble divs into pages, and arrange pages into sites. (Upload page will become this)
- Add shopping cart div.

Start with a Gilgamech Login
1. Make Divs in the Divinator, or choose from the gallery of Public Divs
- reuse Builder page to make Divs graphically and store as JSON.
- Choose an application  to store under when making a div. 
2. Assemble Divs into Applications (SPA files) in SiteOfHand
3. POST your Application to the URL where you want people to GET it from.
ThoriumRocket is mostly just an Application that hosts static applications

How would this replace Login?
- Browser transform is merge user and pass into query string, key is user/pass query string, value is token, server transform is to put the token in the database, update the logged-in flag, and add a new token in this place.
- Need to create, like, a safe request trasform language. Then do a switch on the split query string result. 
- Need to store this, maybe in the DB (255 character limit?)
- Will need to check ACLs to see if the requester can perform the transform.


Roadshow to version onesville
- To replace current index.js
Page editor?
Pagetype Metadata (0 = normal HTML, 1 = Sparational, 2 = ipynb, etc)

- To host Jenn's FriendMeet
Database (or some other kind of) login (use Gilgamech login?)
Database for profile fields (use Sparational?)
S3/other blob storage upload for photos (would this be on her Gilgamech login or the user's)
Bonus question - what would the Sparational APICode look like?
-- GET: {GET}
-- POST: {POST}
-- ACL: {$user:full,JennTheTomato:full}


1. Landing page (about us, sales pitch, etc)
pages needed: Landing

2. signup/login
- has account > token > goto 3.
- doesn't have account  > signup (email/password/credit card/fill out profile/upload photos) > email validation > goto 2.
pages needed: Login, Signup, Edit Profile, Photo Upload, Resend Email Validation
DB calls needed: login check, signup write, profile write, maybe photo location, maybe email validation
Storage calls needed: Maybe create folder (for user), photo uploads

3. View Profile
pages needed: View Profile (should logged in users see more info? how many privacy settings are needed? How could someone hide themselves from a stalker?)
DB calls needed: profile read, maybe photo location read
Storage calls needed: photo downloads

4. Edit Profile
pages needed: Edit Profile (also used in 2)
DB calls needed: profile write, maybe photo location write
Storage calls needed: photo uploads

5. Search Users
- Search bar near top of page > type in search results below it > click a result goto 3.
pages needed: Search 
DB calls needed: search profile descriptions (should people join groups or add tags to more clearly show their interests?)

6. 


- StratoNimbus GoLive
Database for pageviews
Database for metadata
Involve Login and set up ACLs

- GTQ (GMQ/TMQ)
Storage system
- Saves to S3 and/or local and/or other places.
- Dump DB calls to local storage if no DB

ticket system for applications 
- Each server is identical
- Servers can request each other's capabilities (public IP, S3, DB, local storage, etc)
- Ticket will be verb, source, target, payload
- Nodes start with a couple common addresses (localhost:65530, TMQ.Gilgamech.com, etc.)
- Verbs will be store, retrieve, forward, etc
- Workflow: User connects to website (TMQ-a with public IP) - This opens a "retrieve" ticket inside TMQ-a for the website. TMQ-b (with storage) calls it for tickets periodically, sees the "retrieve" ticket, and loads the website into TMQ-a in the ticket's payload section, then marks the ticket complete. When TMQ-a sees the ticket as complete, it will forward the payload (website) to the user.

//{ Init Stripe 
//var stripe = require("stripe")(process.env.STRIPE_KEY || 'sk_test_abcdef1234567890');
//}


*/
var $pageVar;

//{These variables are to populate the dropdowns. Uesd by buildHighlightedPage, buildHighlightedElement, and buildElementRow respectively.
var $pageItemList = ["pageTitle","pageDesc","elements"];
var $elementItemList = ["elementParent","elementType","elementClass","innerText","id","elementStyle","elementType","onClick","onChange","attributeType","attributeAction","href"];
var $elementTypeList = ["a","button","canvas","p","textarea","img","li","ul","hr","h1","h2","h3","h4","h5","h6","div","image","input","script","code","link","option","title","datalist","style","select","td","th","tr","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bdi","bdo","bgsound","big","blink","blockquote","body","br","caption","center","cite","col","colgroup","command","content","data","dd","del","details","dfn","dialog","dir","dl","dt","element","em","embed","fieldset","figcaption","figure","font","footer","form","frame","frameset","head","header","hgroup","html","i","iframe","ins","isindex","kbd","keygen","label","legend","listing","main","map","mark","marquee","menu","menuitem","meta","meter","multicol","nav","nextid","nobr","noembed","noframes","noscript","object","ol","optgroup","output","param","picture","plaintext","pre","progress","q","rp","rt","rtc","ruby","s","samp","section","shadow","slot","small","source","spacer","span","strike","strong","sub","summary","sup","table","tbody","template","tfoot","thead","time","track","tt","u","var","video","wbr","xmp"];
//}

//{Functions

//Copies the current element item to...somewhere Used in buildElementRow.
function renameEItem($element,$current,$new){
	$pageVar.pages[$pageVar.currentPage].elements[$element][$new]=$pageVar.pages[$pageVar.currentPage].elements[$element][$current];
	$pageVar.pages[$pageVar.currentPage].elements[$element].splice($current,1);
};

//Adds the strings in the inputItem to the elementParent as HTML Options. For populating dropdowns? Used in buildElementRow and page load.
function addOption($inputItem,$elementParent,$selectedOption){
	for ($option in $inputItem) {
		if ($inputItem[$option] == $selectedOption) {
			cje($elementParent,{"elements":[ {"elementParent":$elementParent,"elementType":"option","attributeType":"selected","attributeAction":true,"innerText":$inputItem[$option]}]});
		} else {
			cje($elementParent,{"elements":[ {"elementParent":$elementParent,"elementType":"option","innerText":$inputItem[$option]}]});
		}
	}
};

//Removes the previous item's highlight instruction, and adds the current highlight instruction. Then removes the previous page's element controls, and adds the new one, below the element in the list of elements. Used in buildHighlightedPage
function buildHighlightedElement($element){
	removeElement("highlighterDiv");
	removeElement("ulPageRow");
	cje("headWrapper",{"elements":[{"elementParent":"headWrapper","id":"highlighterDiv","elementType":"style","innerText":".Element" + $element + " { background-color: lightblue;}"},{"elementParent":"ulPage"+$pageVar.currentPage+"Element"+$element,"id":"ulPageRow"}]});
	//buildElementRow($parentElement,$itemArray,$element,$inputItem,$errLocype);
	buildElementRow("ulPageRow","",$element,$elementItemList,"add");
	buildElementRow("ulPageRow",$pageVar.pages[$pageVar.currentPage].elements[$element],$element,$elementItemList,"delItem");
	cje("ulPageRow",{"elements":[ {"elementParent":"ulPageRow","elementType":"button","elementClass":"btn btn-danger btn-xs","innerText":"X","onClick":"if (confirm(\"Do you want to delete element "+$element+"?\")) {$pageVar.pages[$pageVar.currentPage].elements.splice("+$element+",1)}" }]});
};

//Write the current page to the uploadableTextArea, add element buttons, rebuild ulPage to have the current elements. Used in page load.
function buildHighlightedPage($page){
	$pageVar.currentPage = $page;
	writeElement("uploadableTextArea",JSON.stringify($pageVar.pages[$page]));
	removeElement("ulPage");
	cje("li"+$page,{"elements":[{"elementParent":"li"+$page,"elementType":"ul","id":"ulPage"}]});
	buildElementRow("ulPage","","",$pageItemList,"add");
	buildElementRow("ulPage",$pageVar.pages[$page],"",$pageItemList,"delPage");
	cje("ulPage",{"elements":[ { "elementParent":"ulPage","elementType":"button","elementClass":"btn btn-primary btn-xs","innerText":"new","onClick":"$pageVar.pages[$pageVar.currentPage].elements[$pageVar.pages[$pageVar.currentPage].elements.length] = {\"elementParent\":\"parentElement\"}" }, { "elementParent":"ulPage","elementType":"ul","id":"ulPage"+$page+"New"}]});
	
	for ($element in $pageVar.pages[$page].elements){
		var $itemLabel
		if ($pageVar.pages[$page].elements[$element].id == null) {
			$itemLabel = $element
		} else{
			$itemLabel = $pageVar.pages[$page].elements[$element].id
		}
		cje("ulPage",{"elements":[{ "elementParent":"ulPage","elementType":"button","elementClass":"btn btn-primary btn-xs Element"+$element,"innerText":$itemLabel,"onClick":"buildHighlightedElement("+$element+");" }, { "elementParent":"ulPage","elementType":"ul","id":"ulPage"+$page+"Element"+$element }]});
	};
	writeElement("uploadableTextArea",JSON.stringify($pageVar.pages[$page]));
	//prettyPrint("uploadableTextArea");
	rebuildElement("htmlDiv");
	var $siteFromTextArea = JSON.parse(readElement("uploadableTextArea"));
	for ($element in $siteFromTextArea.elements){		
		if ($siteFromTextArea.elements[$element].elementParent == "parentElement") {
		} else {
			$siteFromTextArea.elements[$element].elementParent = "buildSite" + $siteFromTextArea.elements[$element].elementParent
		};
		if ($siteFromTextArea.elements[$element].id == null) {
		} else {
			$siteFromTextArea.elements[$element].id = "buildSite" + $siteFromTextArea.elements[$element].id
		};
		console.log($siteFromTextArea.elements[$element].id);
		$siteFromTextArea.elements[$element].elementClass += " highlightDiv Element" + $element;
		$siteFromTextArea.elements[$element].onClick = "buildHighlightedElement("+$element+");";
	};
	cje("htmlDiv",$siteFromTextArea);
};

//Builds requested element dropdown, element-specific form (dropdown, input, textarea), and button set. Parent element, Element list, Element number?, $elementItemList, [add | del Item | del element] Used by buildHighlightedPage and buildHighlightedElement
function buildElementRow($parentElement,$itemArray,$element,$inputItem,$errLocype) {
	var $itemType = "input";
	switch ($errLocype){
		case "add":
			$parentWrapper = "wrApper"+$parentElement;
			$selectItem = "selectAdd"+$parentWrapper;
			cje($parentElement,{"elements":[ {"elementParent":$parentElement,"id":$parentWrapper},{"elementParent":$parentWrapper,"elementType":"select","id":$selectItem}, {"elementParent":$parentWrapper,"elementType":"input","id":"inputAdd"+ $parentWrapper}, {"elementParent":$parentWrapper,"elementType":"button","elementClass":"btn btn-primary btn-xs","innerText":"add","onClick":"renameEItem("+$element+",\"\",readElement(\"selectAdd"+ $parentWrapper+"\"))"}]});
			addOption($inputItem,$selectItem);
		break;
		case "delItem":
			var $styleHolder="$_.style.QuarterHeight";
			var $classHolder="div_textarea $_.classes.ImgRnd $_.classes.FullDesktopFullMobile";
			for ($item in $itemArray) {
				var $itemClass = "";
				var $itemStyle = "";
				switch ($item){
					case "elementParent":
						$itemType = "select";
					break;
					case "elementType":
						$itemType = "select";
					break;
					case "innerText":
						$itemType = "textarea";
						$itemClass=$classHolder;
						$itemStyle=$styleHolder;
					break;
					case "onClick":
						$itemType = "textarea";
						$itemClass=$classHolder;
						$itemStyle=$styleHolder;
					break;
					case "onChange":
						$itemType = "textarea";
						$itemClass=$classHolder;
						$itemStyle=$styleHolder;
					break;
					default:
						$itemType = "input";
					break;
				};
				$currentParentElementName = "ulPage"+$pageVar.currentPage+"Element"+$element+"item"+$item;
				$selectItem = "selectdelItem"+$item;
				$parentWrapper = "wrapper"+$item;
				cje($parentElement,{"elements":[ {"elementParent":$parentElement,"id":$parentWrapper},{"elementParent":$parentWrapper,"elementType":"select","innerText":$item,"id":$selectItem,"onChange":"renameEItem("+$element+",'"+$item+"',readElement(\"select'"+$item+"'\"))"}, {"elementParent":$parentWrapper,"elementType":$itemType,"innerText":$itemArray[$item],"elementClass":$itemClass,"elementStyle":$itemStyle,"id":$currentParentElementName,"onChange":"$pageVar.pages['"+$pageVar.currentPage+"'].elements["+$element+"]['"+$item+"']=readElement('"+$currentParentElementName+"')"}, {"elementParent":$parentWrapper,"elementType":"button","elementClass":"btn btn-danger btn-xs","innerText":"X","onClick":"if (confirm(\"Do you want to delete element item '"+$item+"'?\")) {delete $pageVar.pages[$pageVar.currentPage].elements["+$element+"]['"+$item+"']}"}]});
				addOption($inputItem,$selectItem,$item);
				switch ($item){
					case "elementParent":
						var $elementIdList=["parent"+"Element","headWrapper","bodyWrapper","footWrapper","NavDDWrapper"];
						var $eLen = $elementIdList.length;
						for($currentElement=0;$currentElement<$pageVar.pages[$pageVar.currentPage].elements.length;$currentElement++){
							try{$currentElementID = $pageVar.pages[$pageVar.currentPage].elements[$currentElement].id}catch{};
							if($currentElementID){
								$elementIdList[$eLen]=$currentElementID;
								$eLen++;
							};
						};
						addOption($elementIdList,$currentParentElementName,$pageVar.pages[$pageVar.currentPage].elements[$element].elementParent);
						console.log($element+",'"+$item+"',"+$pageVar.currentPage);
					break;
					case "elementType":
						addOption($elementTypeList,$currentParentElementName,$pageVar.pages[$pageVar.currentPage].elements[$element].elementType);
						console.log($element+",'"+$item+"',"+$pageVar.currentPage);
					break;
					default:
					break;
				};
			};
		break;
		case "delPage":
			for ($item in $itemArray){
				$selectItem = "selectdelPage"+$item;
				$parentWrapper = "Wrapper"+$item;
				switch ($item){
					case "pageDesc":
						$itemType = "textarea";
					break;
					case "elements":
						$itemType = "select";
					break;
					default:
						$itemType = "input";
					break;
				};
				cje($parentElement,{"elements":[ {"elementParent":$parentElement,"id":$parentWrapper},{"elementParent":$parentWrapper,"elementType":"select","innerText":$item,"id":$selectItem,"onChange":"renameEItem("+$element+",'"+$item+"',readElement("+$selectItem+"))"}, {"elementParent":$parentWrapper,"elementType":"input","innerText":$itemArray[$item],"id":$parentWrapper+$pageVar.currentPage+"item"+$item,"onChange":"$pageVar.pages['"+$pageVar.currentPage+"']['"+$item+"']=readElement('"+$parentWrapper+$pageVar.currentPage+"item'"+$item+"'')"}, {"elementParent":$parentWrapper,"elementType":"button","elementClass":"btn btn-danger btn-xs","innerText":"X","onClick":"if (confirm(\"Do you want to delete item '"+$item+"'?\")) {delete $pageVar.pages[$pageVar.currentPage]['"+$item+"']}"}]});
				addOption($inputItem,$selectItem,$item);
			};
		break;
		default:
		break;
	};
};

//Similar to page load, was in dropdown
function dropdown() {
	$fileName = readElement("currentSiteSel");
	xhrRequest("GET","https://s3.amazonaws.com/gilpublic/"+$fileName+"/"+$fileName+".spa",function(cb){
		$pageVar = cb;
		if ($pageVar.length){
			appendElement("errDiv",$pageVar)
		}else{
			$pageVar.currentPage = $pageVar.startingPage;
			removeElement("treeDiv");
			cje("currentPageDiv",{"elements":[ {"elementParent":"currentPageDiv","id":"treeDiv","elementClass":"img-rounded col-md-12 col-xs-12"}]});
			writeElement("uploadableTextArea",JSON.stringify($pageVar.pages[$pageVar.currentPage]));
			writeElement("currentSiteDiv",$pageVar.applicationTitle);
			for ($page in $pageVar.pages) {
				cje("delPageSel",{"elements":[ {"elementParent":"delPageSel","elementType":"option","attributeType":"value","attributeValue":$page,"innerText":$page},{"elementParent":"treeDiv","id":"li"+$page},{"elementParent":"li"+$page,"elementType":"button","elementClass":"btn btn-primary btn-xs","innerText":$page,"onClick":"buildHighlightedPage(\""+$page+"\")"}]})
			};
			//prettyPrint("uploadableTextArea");
		}
	},"JSON");
}

//Should these be parsed element-by-element? Or some other way, to get elementParent?
function parseHtml($input,$callback) {
	var $parsedHead=""
	var $parsedBody=""
	$head = $input.split("<head>")[1].split("</head>")[0]
	$body = $input.split("<body>")[1].split("</body>")[0]
	$split = $body.split("> <");

	for (s in $split) {
		parseHtml2($split[s].toString(),function(cb){$parsedBody += '\{"elementType":'+cb+"},"})
	}
	//parseHtml2($head,function(cb){$parsedHead = cb})
	//parseHtml2($body,function(cb){$parsedBody = cb})
	
	$parsedBody = '{"elements":['+$parsedBody+']}'
	
	$callback($parsedHead,$parsedBody)
	
}; //end parseHtml

//function parseHtml3($input,$callback) {
function parseHtml2($input,$callback) {
	var $parsedText = $input
	//Strip whitespace
	$parsedText = $parsedText.replace(/[\s\t]+/g," ")

	for ($element in $elementTypeList) {
		var regex = new RegExp("/"+$elementTypeList[$element],"g");
		console.log("Element Type: "+regex)
		$parsedText = $parsedText.replace(regex,"\""+$elementTypeList[$element]+"\",\"")
	}
	for ($element in $elementTypeList) {
		var regex = new RegExp($elementTypeList[$element]+" ","g");
	$parsedText = $parsedText.replace(regex,"\""+$elementTypeList[$element]+"\",\"")
	}

	//Replace Class and Style
	$parsedText = $parsedText.replace(/class=/g,",\"classes\":").replace(/style=/g,",\"style\":")
	//Strip opening angle bracket and replace closing with innerText
	$parsedText = $parsedText.replace(/\>/g,",\"innerText\":\"").replace(/</g,"}")
	//Replace element types


	
	for ($element in $elementItemList) {
		var regex = new RegExp($elementTypeList[$element]+" ","g");
		$parsedText = $parsedText.replace(regex,",\""+$elementItemList[$element]+"\":")
	}
	for ($element in $elementItemList) {
		var regex = new RegExp($elementTypeList[$element]+"=","g");
		$parsedText = $parsedText.replace(regex,",\""+$elementItemList[$element]+"\":")
	}
	//Replace equals with colon
	$parsedText = $parsedText.replace(/="/g,"\":\"")
	//$parsedText = $parsedText.replace(/"a /g,"\"a\",").replace(/"div /g,"\"div\",").replace(/"br /g,"\"br\",").replace(/"href /g,"\"href\",").replace(/"p /g,"\"p\",").replace(/"ul /g,"\"ul\",")
	$callback($parsedText)
	
}; //end parseHtml

function parseHtml3($input,$callback) {

}; //end parseHtml

/*JSON parsing
	$parsedText = $parsedText.replace(/<\/[a-zA-Z]+>/g,"\"}").replace(/  /g," ")

	$parsedText = $parsedText.replace(/," "/g,",\"").replace(/,"","/g,",\"")
	$parsedText = $parsedText.replace(/""/g,"\",\"").replace(/"," "/g,"\",\"").replace(/" "/g,"\",\"").replace(/",","/g,"\",\"")
	$parsedText = $parsedText.replace(/=/g,"\":")
	$parsedText = $parsedText.replace(/s","tyle/g,"style").replace(/u","l/g,"ul").replace(/b","ody/g,"body").replace(/sub","mit/g,"submit").replace(/i","d/g,"id")
	$parsedText = $parsedText.replace(/ value"/g,"\"value\"").replace(/ name"/g,"\"name\"").replace(/ onclick"/g,"\"onclick\"")
	$parsedText = $parsedText.replace(/,"innerText":"}/g,"}").replace(/,"innerText":",} "}/g,"}").replace(/,"innerText":"  /g,"}").replace(/,"innerText":",} } "}/g,"}").replace(/,"innerText":",}"}/g,"}").replace(/,"innerText":"}/g,"}").replace(/"innerText":" ,/g,"\"},")
	$parsedText = $parsedText.replace(/"} "}/g,"\"}").replace(/,"}/g,"\"}").replace(/""}/g,"\"}")
	
	$parsedText = JSON.parse($parsedText)
	for ($element in $parsedText) {
		$parsedText[$element].elementParent = "ParentElement"
	}
	$parsedText = JSON.stringify($parsedText)
*/

function loadSite($pageUrl){
	xhrRequest("GET",$pageUrl,function(cb){
		//If starts with HTML, parse site out of the pageSettingsJson div. Otherwise just parse directly.
		if (cb.substring(1, 0) == "<"){
			$pageVar = JSON.parse(cb.split("<div id=\"pageSettingsJson\" >")[1].split("</div><script>")[0]);
		} else if (cb.substring(1, 0) == "{"){
			$pageVar = JSON.parse(cb);
		}
	});


	//If the table is long enough to be a list, split it at the commas. Otherwise it's a single line.
/*Adds page list to sidebar dropdown.
	if ($userACLTable.length>25){
		$userACLTable =$pageVar .userACLTable.split(",");
	};
	//Add user's pags to dropdown.
	addOption($userACLTable,"sidebarDropdown");
*/
	//Set current page to Builder page.
	$pageVar.currentPage = "s3";
	//Writes JSON for the current page to the uploadableTextArea. This chokes so hard when it breaks, that it takes any error handling with it, spilling into the console with a security error.
	if (document.getElementById("uploadableTextArea") == null) {
		writeElement("errDiv","Upload area did not load. Please use HTTP until it gets a cert.");
	} else {
		writeElement("uploadableTextArea",JSON.stringify($pageVar.pages[$pageVar.currentPage]));
	}   	//Foreach page, add an option to currentSiteSel, add its item to the sidebar, and add its button to its item on sidebar.
	for ($page in $pageVar.pages) {
			cje("currentSiteSel",{"elements":[ {"elementParent":"currentSiteSel","elementType":"option","attributeType":"value","attributeValue":$page,"innerText":$page},{"elementParent":"currentSite","id":"li"+$page}]});
		};
	//, cje("currentSiteSel",{"elements":[ {"elementParent":"nav2ddc","innerText":$key,"onClick":"rbp(\""+$key+"\")"}]});
	//Adds current pages to advancedPageDiv
	//buildElementRow("advancedPageDiv",$spaRationalMain.pages,"",getKeys($spaRationalMain.pages),"delPage");
	//prettyPrint("uploadableTextArea");
}
//}

//{Load Pages from S3
xhrRequest("GET","http://upload.gilgamech.com/",function(cb){cje("outputRowJmlDiv",cb)},"JSON")

loadSite("https://s3.amazonaws.com/gilpublic/giltech/giltech.spa")
//Quick fix for a commenting bug that keeps giving this an unintended onclick.
document.getElementById("sidebar").onclick = ""
//}

