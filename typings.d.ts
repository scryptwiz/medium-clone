export interface Post {
    _id: Any;
    _createdAt: String;
    title: String;
    author: {
        name: String;
        image: String;
    },
    comments: Comment[];
    description: String;
    mainImage: {
        asset: {
            url: String;
        };
    };
    slug: {
        current: String;
    };
    _createdAt: Date;
    body: [Object]
}

export interface Comment {
    approved: Boolean;
    comment: String;
    email: String;
    name: String;
    post: {
        _ref: String,
        _type: String;
    };
    _createdAt: String;
    _id: Any;
    _rev: String;
    _type: String;
    _updatedAt: String
}