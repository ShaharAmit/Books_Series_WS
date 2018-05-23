const Series = require('../Models/booksSeries'),
    Validation = require('../validation'),
    validation = new Validation();

module.exports = class BooksSeries {
    allSerieses() {
        return Series.find().catch(err => console.log(err));
    }

    //many validations for easy to work service
    seriesByName(seriesName) {
        const check = {
            check: false,
            res: ''
        }
        let checked = validation.checkParams([seriesName]);
        if(checked.check===true) {
            return Series.findOne({
                seriesName: seriesName
            }).then(doc => {
                const checked = validation.checkDoc(doc);
                    if(checked.check===true) {
                        return doc;
                    } else {
                        return {error: checked.res};
                    }
            }).catch(err => console.log(err));
        } else {
            return new Promise((res,rej) => {
                res({error: checked.res});
            });
        }
    }

    //many validations for easy to work service
    //search by genre and author
    seriesesByParamsGA(genre, author) {
        const check = {
                check: false,
                res: ''
        }
        let checked = validation.checkParams([genre,author]);
        if(checked.check===true) {
            return Series.find({ 
                genre: genre,
                author: author
            }).then(docs => {
                const checked = validation.checkDocs(docs);
                if(checked.check===true) {
                    return docs;
                } else {
                    return {error: checked.res};
                }
            }).catch(err => console.log(err));
        } else {
            check.check=false;
            check.res=checked.res;
        }
        if (!check.check) {
            return new Promise((res,rej) => {
                res({error: check.res});
            });
        }
    }

    //many validations for easy to work service
    //search by author and book name
    seriesesByParamsAB(author, bookName) {
        const check = {
            check: false,
            res: ''
        }
        let checked = validation.checkParams([author,bookName]);
        if(checked.check===true) {
            return Series.findOne({
                author: author,
                books: { $elemMatch: { bookName: bookName } }
            }).then(doc => {
                const checked = validation.checkDoc(doc);
                    if(checked.check===true) {
                        return doc;
                    } else {
                        return {error: checked.res};
                    }
            }).catch(err => console.log(err));
        } else {
            check.check=false;
            check.res=checked.res;
        }
        if (!check.check) {
            return new Promise((res,rej) => {
                res({error: check.res});
            });
        }
    }
};