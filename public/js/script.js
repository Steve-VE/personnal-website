let haloContainer;

window.onload = ()=>{
    console.log("Script loaded");

    haloContainer = new HaloContainer(document.querySelector('body'));
    setInterval(update, 33);
    // let sections = document.querySelectorAll('#skills, #experiences, #projects');
    // for(let section of sections){
    //     let subSections = section.querySelectorAll('.column');
        
    //     for(let subSection of subSections){
    //         addClosingFunction(subSection, 'ul', 'h3', 100);
    //     }
    //     addClosingFunction(section, '.content', headings(), 10);
    // }
};

const update = ()=>{
    if(haloContainer !== null && haloContainer !== undefined){
        haloContainer.update();
        haloContainer.render();
    }
};

const addClosingFunction = (element, selectorToHide, selectorInteract, step = 10, eventType = 'click', closedByDefault = true)=>{
    let content = element.querySelector(selectorToHide);
    if(content !== null && content !== undefined){
        content.classList.add('closed');
        content.setAttribute('data-height', content.clientHeight);
        content.style.height = 0;
    }
    
    let title = element.querySelector( selectorInteract );
    if(title !== null && title !== undefined){
        title.addEventListener(eventType, (e)=>{
            if(content.classList.contains('closed')){
                content.classList.remove('closed');
                deploy(content, step);
            }
            else if(content.classList.contains('opened')){
                content.classList.remove('opened');
                close(content, step);
            }
            console.log(e.target);
        });
    }
};

const deploy = (content, step = 10)=>{
    console.log("Opening " + content);
    let currentHeight = parseInt(content.style.height);
    const maxHeight = parseInt(content.getAttribute('data-height'));
    let t = 0;
    let fold = setInterval(()=>{
        if(currentHeight < maxHeight){
            currentHeight = InOutQuadBlend(t) * maxHeight;
            content.style.height = currentHeight + "px";
            
            if(currentHeight >= maxHeight){
                content.style.height = "";
                content.classList.add('opened');
                clearInterval(fold);
                fold = undefined;
            }
        }
        t += ( 1 / step);
    }, 33);
};

const close = (content, step = 10)=>{
    console.log("Close " + content);
    let currentHeight = parseInt(content.clientHeight);
    const maxHeight = parseInt(content.getAttribute('data-height'));
    let t = 0;
    let fold = setInterval(()=>{
        if(currentHeight > 0){
            currentHeight = maxHeight - (InOutQuadBlend(t) * maxHeight);
            content.style.height = currentHeight + "px";
            
            if(currentHeight <= 0){
                content.style.height = "0";
                content.classList.add('closed');
                clearInterval(fold);
                fold = undefined;
            }
        }
        t += ( 1 / step);
    }, 33);
};

const headings = (first = 1, last = 6)=>{
    let strHeaders = "";
    for(let i = first; i <= last; i++){
        strHeaders += 'h' + i;
        if(i != last){
            strHeaders += ', ';
        }
    }
    return strHeaders;
};

const InOutQuadBlend = (t)=>{
    if(t <= 0.5){
        return 2.0 * Math.sqrt(t);
    }
    t -= 0.5;
    return 2.0 * t * (1.0 - t) + 0.5;
};