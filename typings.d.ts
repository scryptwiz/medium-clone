export interface Post {
    _id: Any;
    _createdAt: String;
    title: String;
    author: {
        name: String;
        image: String;
    },
    description: String;
    mainImage: {
        asset: {
            url: String;
        };
    };
    slug: {
        currnet: String;
    };
    body: [Object]
}