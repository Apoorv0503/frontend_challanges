//Follow Config driven UI and scalability concept
const sections=[ 
    {
        title:"section 1",
        content:"this is the content of section 1. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        title:"section 2",
        content:"this is the content of section 2. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        title:"section 3",
        content:"this is the content of section 3. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
]


document.addEventListener("DOMContentLoaded", function(){

    //populate the accordion data dynamically

    const accordionContainer=document.getElementById("accordion");

    sections.forEach((section,index)=>{
        const sectionItem=document.createElement("div");
        sectionItem.className="accordion-item";

        const sectionHeader=document.createElement("div");
        sectionHeader.className="accordion-header";
        sectionHeader.innerHTML=`<h1>${section.title}</h1>`;

        const sectionContent=document.createElement("div");
        sectionContent.className="accordion-content";
        sectionContent.innerHTML=`<p>${section.content}</p>`;

        sectionItem.append(sectionHeader);
        sectionItem.append(sectionContent);
        accordionContainer.append(sectionItem);

        if(index==0){
            sectionItem.classList.add("active");
            sectionContent.style.display="block";
        }

    });

    //listen for clicks over any section-headers in accordion, use event delegation
    accordionContainer.addEventListener("click",function(event){

        //Find the closest element that matches the CSS selector ".accordion-header" from "recently clicked Item"
        const clickedHeader=event.target.closest(".accordion-header");
        //when no header found
        if(!clickedHeader)return; 

        //now, we will try to find the clicked item's header , content and parent section
        const clickSection=clickedHeader.parentNode;
        const content=clickSection.querySelector(".accordion-content");
        const isActive=clickSection.classList.contains("active"); //check if clicked section is already selected or not


        //now, make each accordion content disappear and then, make clicked one as active
        document.querySelectorAll(".accordion-item").forEach((item)=>{
            item.classList.remove("active");
            item.querySelector(".accordion-content").style.display="none";
        });

        //if clicked section is not already active, make it active and its content visible
        if(!isActive){
            //already got these things above
            clickSection.classList.add("active");
            content.style.display="block";
        }   
        

    });
});



/*
Closest(): Find the closest element that matches the CSS selector ".container" form the caller item

const element = document.getElementById("myElement");
const closest = element.closest(".container");

*/