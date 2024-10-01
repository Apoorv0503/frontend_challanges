//dynamic data coming from backend API, basically we are building a config driven - scalable UI
const tabData=[
    {
        id:"tab1",
        title:"Tab 1",
        content:"This is the content of tab 1"
    },
    {
        id:"tab2",
        title:"Tab 2",
        content:"This is the content of tab 2"
    },
    {
        id:"tab3",
        title:"Tab 3",
        content:"This is the content of tab 3"
    }
]

document.addEventListener("DOMContentLoaded",function(){

    //default active tab is first tab
    let activeTab=tabData[0].id;

    const tabContainer = document.querySelector(".tabContainer");
    const tabContentContainer = document.querySelector(".tabContentContainer");

    //to populate the basic UI using data from backend
    function populateData(){
        tabData.forEach((tab)=>{

            //create a tab button
            const tabButton=document.createElement("button");
            tabButton.textContent=tab.title;
            tabButton.className="tabLink";
            tabButton.setAttribute("id",tab.id);
            tabContainer.append(tabButton);

            //create a tab button's content box
            const tabContent=document.createElement("div");
            tabContent.className="tabContent";

            //created a new id for content boxs
            const newTabContentId=`${tab.id}Box`
            // console.log(newTabContentId)

            tabContent.setAttribute("id",newTabContentId);
            tabContent.innerHTML=`
            <h1>${tab.title}</h1>
            <p>${tab.content}</p>
            `;
            tabContentContainer.append(tabContent);
        });
    }

    //take action according to the clicked tab
    tabContainer.addEventListener("click",function(event){
        const clickedItem=event.target;

        console.log(clickedItem+" -> this item got clicked");
        if(clickedItem.matches(".tabLink")){
            const CurrTabId=clickedItem.getAttribute("id");

            if(activeTab!=CurrTabId){
            //open this current tab and close rest of all
                openTab(CurrTabId);
                activeTab=CurrTabId;
            }
            
        }
    });

    function openTab(CurrTabId){
        //add "open" class to this current tab and its content, and remove "open" class from others
        const tabLinks=document.querySelectorAll(".tabLink");
        const tabContents=document.querySelectorAll(".tabContent");

        tabLinks.forEach((tabLink)=>{
            tabLink.classList.remove("active");
        });

        tabContents.forEach((tabContent)=>{
            tabContent.classList.remove("active");
        });

        //now it is the time to add "active" class to the selected tab button and tab's content
       document.getElementById(CurrTabId).classList.add("active");
        document.getElementById(`${CurrTabId}Box`).classList.add("active");
    }

    populateData();
    //for renderig the default selected tabs and their contents
    document.getElementById(activeTab).classList.add("active");
    document.getElementById(`${activeTab}Box`).classList.add("active");
});