import {ContentType} from "./contentType";
import axios, {AxiosRequestConfig} from "axios";

let clickedFolderUrls: string[] = [];


let items = document.querySelectorAll('.js-navigation-item');
items.forEach(item => {
    analyze(item);
});


function analyze(rowItemElement: Element): void {
    let iconElement = rowItemElement.children[0];
    let anchorElement = rowItemElement.getElementsByTagName('a')[0];
    if (iconElement instanceof HTMLDivElement && anchorElement instanceof HTMLAnchorElement) {
        let svgElement = iconElement.children[0];
        let contentType: ContentType = ContentType.fromString(svgElement.getAttribute('aria-label') as string);
        iconElement.onclick = function (event) {
            if (contentType.isDirectory()) {
                if (clickedFolderUrls.includes(anchorElement.href)) {
                    fold(anchorElement);
                } else {
                    unfold(rowItemElement, anchorElement);
                }
            }
        }
    }
}

function fold(anchorElement: HTMLAnchorElement) {
    document.getElementById(anchorElement.href)?.remove();
    let newClickedFolderUrls:string[] = [];
    clickedFolderUrls.forEach((e) =>{
        let re = new RegExp(anchorElement.href);
        if (!re.test(e)) {
            newClickedFolderUrls.push(e);
        }
    });

    clickedFolderUrls = newClickedFolderUrls;
}

function unfold(rowItemElement: Element, anchorElement: HTMLAnchorElement) {
    axios.get(anchorElement.href).then((result) => {
        clickedFolderUrls.push(anchorElement.href);
        let parser = new DOMParser();
        let html = parser.parseFromString(result.data, 'text/html');

        let targets = html.getElementsByClassName('js-navigation-container') as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < targets.length; i++) {
            let filesElement = targets[i];
            if (filesElement.getAttribute('aria-labelledby') === 'files') {
                filesElement.children[1].remove();
                filesElement.style.marginLeft = '5%';
                let container = document.createElement('div');
                container.id = anchorElement.href;
                container.appendChild(filesElement);
                rowItemElement.insertAdjacentElement('afterend', container);
            }

            html.querySelectorAll('.js-navigation-item').forEach((e) => {
                analyze(e);
            });
        }
    });
}