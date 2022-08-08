



function addHeader() {
	addDiv("titleHead","",'head','Gilgamech Technologies','title');
	addDiv("scr1","",'head','','script','./public/js/Gilgamech.js');
	addDiv("scr2","",'head','','script','./public/js/jquery.min.js');
	addDiv("link1","",'head','','link','./public/stylesheets/bootstrap.min.css');
	addDiv("link2","",'head','','link','./public/stylesheets/normalize.css');
	addDiv("link3","",'head','','link','./public/stylesheets/main.css');
	addDiv("link4","",'head','','link','./public/stylesheets/mobile.css');
	addDiv("link5","",'head','','link','./public/stylesheets/rgb.css');
	
}; // end addHeader

function addNav() {
	var $pclass1="hidden-sm hidden-xs"
	var $pclass2="hidden-md hidden-lg"
	
	addDiv("gtBannerWrapper","wrapper container",'body');
	addDiv("gtBannerLink","img-rounded top",'gtBannerWrapper',"","a","","/");
	addDiv("gtBanner","img-rounded top",'gtBannerLink',"Gilgamech Technologies");
	
	addDiv("navbar","navbar navbar-static-top navbar-inverse",'body');
	addDiv("navWrapper","wrapper container",'navbar');
	addDiv("nav2","nav navbar-nav",'navWrapper','','ul');
	
	addDiv("l1",$pclass1,'nav2','','li');
	addDiv("a1","",'l1','Fruitbot!','a',"https://gil-api.herokuapp.com/fruitbot");
	
	addDiv("l2",$pclass1,'nav2','','li');
	addDiv("a2","",'l2','Bad Password','a',"https://gil-api.herokuapp.com/badpw");

	addDiv("l3","",'nav2','','li');
	addDiv("a3","",'l3','Chat!','a',"https://gil-api.herokuapp.com/chat");

	addDiv("dd","dropdown",'nav2');
	addDiv("ddp","",'dd','Menu','p');
	addDiv("ddc","dropdown-content",'dd',);
	
	
	addDiv("lip1",$pclass2,'ddc','','p');
	addDiv("aip1","",'lip1','Fruitbot!','a',"https://gil-api.herokuapp.com/fruitbot");
		
	addDiv("lip3",$pclass2,'ddc','','p');
	addDiv("aip3","",'lip3','Bad Password','a',"https://gil-api.herokuapp.com/badpw");

	addDiv("lip4",$pclass2,'ddc','','p');
	addDiv("aip4","",'lip4','Chat!','a',"https://gil-api.herokuapp.com/chat");

	addDiv("lip13","",'ddc','','p');
	addDiv("aip13","",'lip13','addDiv Explained','a',"https://gil-api.herokuapp.com/addDiv");

	addDiv("lip11","",'ddc','','p');
	addDiv("aip11","",'lip11','RGB Calculator','a',"https://gil-api.herokuapp.com/rgb");

	addDiv("lip12","",'ddc','','p');
	addDiv("aip12","",'lip12','Draggable Squares','a',"https://gil-api.herokuapp.com/dsq");

	addDiv("lip5","",'ddc','','p');
	addDiv("aip5","",'lip5','Coins','a',"https://gil-api.herokuapp.com/coin");

	addDiv("lip6","",'ddc','','p');
	addDiv("aip6","",'lip6','JSON Lint','a',"https://gil-api.herokuapp.com/jsonlint");

	addDiv("lip7","",'ddc','','p');
	addDiv("aip7","",'lip7','Git','a',"https://gil-api.herokuapp.com/git");

	addDiv("lip8","",'ddc','','p');
	addDiv("aip8","",'lip8','Meme Maker','a',"https://gil-api.herokuapp.com/meme");

	addDiv("lip9","",'ddc','','p');
	addDiv("aip9","",'lip9','Arkdata Dynamap','a',"https://gil-api.herokuapp.com/demo");

	addDiv("lip10","",'ddc','','p');
	addDiv("aip10","",'lip10','Arkdata','a',"https://gil-api.herokuapp.com/Arkdata");

	addDiv("lip1","",'ddc','','p');
	addDiv("aip1","",'lip1','text2','a',"https://gil-api.herokuapp.com/text2");

	addDiv("lip1",$pclass2,'ddc','','p');
	addDiv("aip1","",'lip1','Login!','a',"https://gil-api.herokuapp.com/login");
	
	addDiv("dd2","dropdown" + $pclass2,'nav2');
	addDiv("ddr","",'dd2','StackOverflow Links','p');
	addDiv("ddrc","dropdown-content",'dd2',);

	addDiv("lipr5","",'ddc','','p');
	addDiv("aipr5","",'lipr5','Coins','a',"https://gil-api.herokuapp.com/coin");
	
	var $nbr = "navbar-right"
	addDiv("nav3","nav navbar-nav" + " " + $nbr + " " + $pclass1,'navWrapper','','ul');
	
	addDiv("lr1",$nbr + " " + $pclass1,'nav3','','li');
	addDiv("ar1","",'lr1','Login!','a',"https://gil-api.herokuapp.com/login");
	
	addDiv("dd42","dropdown" + " " + $nbr + " " + $pclass1,'nav3');
	addDiv("dd4r","",'dd42','StackOverflow Links','p');
	addDiv("dd4rc","dropdown-content",'dd42',);

	addDiv("lip4r5","",'dd4rc','','p');
	addDiv("aip4r5","",'lip4r5','Coins','a',"https://gil-api.herokuapp.com/coin");
	

}; // end addPage

function addFooter() {
	addDiv("spacer","container-fluid",'body',"");
	addDiv("footClan","footer navbar-static-bottom",'body');
	addDiv("ftBanner","banner",'footClan','','p');
	addDiv("aFooter","",'ftBanner','','a',"https://www.duckduckgo.com");
	addDiv("aFooterImg","",'aFooter',"C1ick h34r ph0r m04r inph0",'img',"./public/images/BannerImage.gif","","height","250px");
	document.getElementById("aFooterImg").style.height = "150px";
	addDiv("aFooterCR","copyright",'footClan','(c) 2013-2018 Gilgamech Technologies - We are the gears that make our world go around.','p');
	
}; // end addFooter

  




										