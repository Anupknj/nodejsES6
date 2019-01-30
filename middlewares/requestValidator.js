import joi from 'joi';

const schema = {
          
    name: joi.string().min(3).max(10).required(),
    info: joi.string().min(3).max(30)
};

module.exports = {
    validate(newUser, res) {

            const input = {
                name : newUser.name,
                info : newUser.info
            }

        const result = joi.validate(input, schema);

        if (result.error) {
            res.status(400).send(result.error.details[0].message);
            return;
        } else {
            console.log("input validated.....all looks good")
            return;
        }
    },

    sendResponse(res, err, data, isJsonP) {
        if (isJsonP) {
          if (err) {
            err.error = true;
            if (typeof(err.success) === 'undefined') {
              err.success = false;
            }
            res.jsonp(err);
          } else {
            if (typeof(data.success) === 'undefined') {
              data[success] = true;
            }
            console.log("yo")
            console.log(data)
            res.jsonp(data);
          }
        } else {
          if (err) {
            err.error = true;
            res.json(err);
          } else {
              console.log("wassup")
            res.json(data);
          }
        }
      }
}
