import {ContentType} from "./contentType";

let items = document.querySelectorAll('.js-navigation-item');
items.forEach(item => {
    let iconElement = item.children[0];
    if (iconElement instanceof HTMLDivElement) {
        let svgElement = iconElement.children[0];
        let contentType: ContentType = ContentType.fromString(svgElement.getAttribute('aria-label') as string);
        iconElement.onclick = function (event) {
            if (contentType.isDirectory()) {
                console.log(contentType);
            }
        }
    }
});