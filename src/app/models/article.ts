import {isNullOrUndefined} from "util";

export class Article {

    /**
     * @param title No more than one line
     * @param content can be long
     * @param imageUrl one image, if wanted, set null otherwise
     * @param category that could be displayed
     */
    constructor(title: string, content: string, imageUrl: string, category: string) {
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.category = category;
    }

    title: string;
    content: string;
    imageUrl: string;
    category: string;
    downloadableImageUrl: string;

    static fromDB(res): Article {
        return this.fromJSON(res.data());
    }

    static fromJSON(doc): Article {
        const article = new Article(doc.title, doc.content, doc.imageUrl, doc.category);
        if (article.imageUrl !== '' && !isNullOrUndefined(article)) {
            // If the article has an image, we load downloadableImageUrl
        }
        return article;
    }
}
