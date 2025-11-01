


export const generalFields={
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
    email:joi.string().email(),
    file:joi.object({
        size: joi.number().positive().required(),
        path: joi.string().required(),
        filename: joi.string().required(),
        destination: joi.string().required(),
        mimetype: joi.string().required(),
        encoding: joi.string().required(),
        originalname: joi.string().required(),
        fieldname: joi.string().required(),

    }),
    headers: joi.object({
        "cache-cotroler":joi.string(),
        "postman-token":joi.string(),
        "content-type":joi.string(),
        "content-length":joi.string(),
        host:joi.string(),
        "user-agent":joi.string(),
        accspt:joi.string(),
        "accspt-encoding":joi.string(),
        connection:joi.string(),
        token:joi.string(),
    })
}