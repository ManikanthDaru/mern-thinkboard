import ratelimit from "../config/redis.js";

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-limit-key");

        if (!success) {
            return res.status(429).json({message: "Too many requests, please try again later"})
        }

        next();
    }
    catch (err) {
        console.log("Rate limit error: ", err);
        next(err);
    }
}

export default rateLimiter;