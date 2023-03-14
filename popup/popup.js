let nodata = document.getElementById("no-data");
let ASprofile = document.getElementById("AS");
let MBFCprofile = document.getElementById("MBFC");

const stylingMap = 
  {
    "Left":"background-color:#2c64a4;",
    "Lean Left":"background-color:#9cccec;",
    "Center":"background-color:#9464a4;",
    "All Sides":"background-color:#9464a4;",
    "Lean Right":"background-color:#cc9c9c;",
    "Right":"background-color:#cc2424;",
    "Satire":"background-color:#d3db39;",
    "Pro-Science":"background-color:#1a9830;",
    "Fake News":"background-color:#000000;",
    "Conspiracy":"background-color:#000000;",
    "Very High":"background-color:#1a9830;",
    "High":"background-color:#1a9830;",
    "Moderate":"background-color:#88a81e;",
    "Mixed":"background-color:#E36C0A;",
    "Low":"background-color:#FF0000;",
    "Very Low":"background-color:#FF0000;"
  }


generateMBFCPopup()
generateASPopup()


async function generateMBFCPopup(){
  let obj = await chrome.storage.local.get("MBFCPopupData")
  MBFCdata = obj.MBFCPopupData
  
  if(MBFCdata === "no data"){
    MBFCprofile.setAttribute("style","display:none;");
  }
  else{
    nodata.setAttribute("style","display:none;");

    let link = document.createElement("a")
    link.setAttribute("href",MBFCdata.profile);
    link.setAttribute("target","_blank");
    link.setAttribute("title","Click here to go to the MBFC profile");
    let element = document.createElement("img")
    element.setAttribute("src","../icons/MBFClogo.png")
    element.setAttribute("style","max-width: 150px;")
    link.appendChild(element)
    MBFCprofile.append(link)

    element = document.createElement("h2")
    element.innerHTML = MBFCdata.name
    element.setAttribute("style","text-align: center;")
    MBFCprofile.append(element)

    element = document.createElement("h3")
    element.innerHTML = "Media Bias Rating: <span style=" + stylingMap[MBFCdata.bias] + ">&nbsp;" + MBFCdata.bias + "&nbsp;</span>"
    element.setAttribute("title","Media bias rating is determined by mediabiasfactcheck.com by reviewing the content of the news site publishes using various methods and determining where their bias lies on the left right political spectrum.");
    MBFCprofile.append(element)

    element = document.createElement("h3")
    element.innerHTML = "Sourcing Rating: <span style=" + stylingMap[MBFCdata.factual] + ">&nbsp;" + MBFCdata.factual + "&nbsp;</span>"
    element.setAttribute("title","Sourcing Rating is determined by mediabiasfactcheck.com by reviewing the quality of the sourcing material used by news sites in publishing articles. Sourcing rating metric is a scale as follows: very low, low, mixed, moderate, high, very high");
    
    MBFCprofile.append(element)
    
    //element = document.createElement("h3")
    //element.innerHTML = "Credibility Rating: " + MBFCdata.credibility
    //MBFCprofile.append(element) 

    element = document.createElement("hr")
    MBFCprofile.append(element)
  }       
}

async function generateASPopup(){
  //get allsides data from storage
  let obj = await chrome.storage.local.get("ASPopupData")
  ASdata = obj.ASPopupData
  //if the data in storage states "no data", hide the allsides element in the popup, otherwise generate the allsides element
  if(ASdata === "no data"){
    ASprofile.setAttribute("style","display:none;");
  }
  else{
    nodata.setAttribute("style","display:none;");
    //create allsides icon with link to allsides profile
    let link = document.createElement("a")
    link.setAttribute("href",ASdata.allsidesurl);
    link.setAttribute("target","_blank");
    link.setAttribute("title","Click here to go to the Allsides profile");
    let element = document.createElement("img")
    element.setAttribute("src","../icons/allsideslogo.png")
    element.setAttribute("style","max-width: 150px;")
    link.appendChild(element)
    ASprofile.append(link)
    //create title of news source
    element = document.createElement("h2")
    element.innerHTML = ASdata.name
    element.setAttribute("style","text-align: center")
    ASprofile.append(element)
    //create political bias header
    element = document.createElement("h3")
    element.innerHTML = "Media Bias Rating: <span style=" + stylingMap[ASdata.bias] + ">&nbsp;" + ASdata.bias + "&nbsp;</span>"
    element.setAttribute("title","Media bias rating is determined by allsides.com by reviewing the content of the news site publishes using various methods and determining where their bias lies on the left right political spectrum.");
    ASprofile.append(element)
    //create confidence level header
    //element = document.createElement("h3")
    //element.innerHTML = "Confidence Level: " + ASdata.confidence
    //ASprofile.append(element)
    //create community votes section
    element = document.createElement("h3")
    element.innerHTML = "Community Votes:"
    element.setAttribute("title","Community agreement is determined by allsides.com by their voting system, those who choose to vote can dictate whether they agree or disagree with the media bias rating assigned.");
    ASprofile.append(element)
    var total = parseInt(ASdata.agreement) + parseInt(ASdata.disagreement);
    var agreementPercent = (parseInt(ASdata.agreement)/total) * 100;
    var disagreementPercent = (parseInt(ASdata.disagreement)/total) * 100;
    agreement = document.createElement("div")
    agreement.innerHTML = ASdata.agreement + "<br>" + " agree";
    agreement.setAttribute("style","text-align:center;color:white;float:left;"+"width:"+agreementPercent.toString()+"%;background-color:green");
    disagreement = document.createElement("div")
    disagreement.innerHTML = ASdata.disagreement + "<br>" + " disagree";
    disagreement.setAttribute("style","text-align:center;color:white;float:left;"+"width:"+disagreementPercent.toString()+"%;background-color:red");
    votes = document.createElement("div")
    votes.appendChild(agreement);
    votes.appendChild(disagreement);
    ASprofile.append(votes)
    //create new lines and horizantal line for ending element
    element = document.createElement("br")
    ASprofile.append(element) 
    element = document.createElement("br")
    ASprofile.append(element) 
    element = document.createElement("hr")
    ASprofile.append(element)
  } 
}


//Event listeners for buttons to redirect you to a new tab based on what they click
document.addEventListener('DOMContentLoaded', function () {
  var settingsButton = document.getElementById('options');
  settingsButton.addEventListener('click', function () {
    var url = "chrome-extension://" + chrome.runtime.id + "/options/options.html";
    chrome.tabs.create({ url });
  });

  var historyButton = document.getElementById('history');
  historyButton.addEventListener('click', function () {
    var url = "chrome-extension://" + chrome.runtime.id + "/history/history.html";
    chrome.tabs.create({ url });
  });
});

