import PostModel from '../models/Post.js'


export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts.map((obj) => obj.tags).flat().slice(0, 5);

        res.json(tags)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить статьи",
        })
    }
};

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить статьи",
        })
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedPost = await PostModel.findOneAndUpdate(
            {
                _id: postId
            }, {
                $inc: { viewsCount: 1 }
            }, {
                returnDocument: 'after'
            }
        ).populate('user').exec();

        if (!updatedPost) {
            return res.status(404).json({
                message: "Статья не найдена",
            });
        }

        res.json(updatedPost);
 
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить статью",
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        if (!postId) {
            return res.status(404).json({
                message: "Нет удалось найти статью",
            });
        }
        const removePost = await PostModel.findByIdAndDelete({
            _id: postId
        }).exec();
        console.log(removePost)

        if (!removePost) {
            return res.status(404).json({
                message: "не удалось найти статью",
            });
        }
        
        res.json({
            message: "Статья успешно удалена",
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить статьи",
        });
    }
};

export const create =  async (req, res) => {
    try {
        const doc = new PostModel ({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            likes: req.body.likes,
            user: req.userId,
            estimation: req.body.estimation,
        })

        const post = await doc.save();

        res.json(post)
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось создать статью",
        })
    }
};

export const update = async(req, res) => {
    try {
        const postId = req.params.id;
        await PostModel.findOneAndUpdate(
            {
                _id: postId
            }, 
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags.split(','),
                likes: req.body.likes,
                user: req.userId,
                estimation: req.body.estimation,
            }, 
            {
                returnDocument: 'after'
            }
        );
        res.json({
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось обновить статью",
        })
    }
};

export const likesState = async (req, res) => {
    try {
        const postId = req.params.id;
        const { likes } = req.body;

        const post = await PostModel.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: 'Рецензия не найдена',
            });
        }
        post.likes = likes;

        await post.save();
        res.json({
            message: 'Лайк успешно добавлен',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Не удалось добавить лайк',
        });
    }
};