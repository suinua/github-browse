import {ContentType} from "./contentType";
import axios, {AxiosRequestConfig} from "axios";


let items = document.querySelectorAll('.js-navigation-item');
items.forEach(item => {
    let iconElement = item.children[0];
    let anchorElement = item.getElementsByTagName('a')[0];
    if (iconElement instanceof HTMLDivElement && anchorElement instanceof HTMLAnchorElement) {
        let svgElement = iconElement.children[0];
        let contentType: ContentType = ContentType.fromString(svgElement.getAttribute('aria-label') as string);
        iconElement.onclick = function (event) {
            if (contentType.isDirectory()) {
                axios.get(anchorElement.href).then((result) => {
                    let parser = new DOMParser();
                    let html = parser.parseFromString(result.data, 'text/html');

                    let targets = html.getElementsByClassName('js-navigation-container') as HTMLCollectionOf<HTMLElement>;
                    for (let i = 0; i < targets.length; i++) {
                        let filesElement = targets[i];
                        if (filesElement.getAttribute('aria-labelledby') === 'files') {
                            filesElement.style.marginLeft = '5%';
                            item.insertAdjacentElement('afterend', filesElement);
                        }
                    }
                });
            }
        }
    }
});