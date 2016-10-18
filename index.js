const dox = require('dox');

const formatStringForName = content =>
    content.toString()
        .replace(/\.prototype|\(\)/g, '');

const formatStringForUID = content =>
    content.toString()
        .toLowerCase()
        .replace(/[^\w\.]+/g, '-')
        .replace(/^-|-$/g, '');

const parser = (content, filename) =>
    dox.parseComments(content, {'raw': true}).reduce((prev, curr) => {

        if (!curr.ignore && curr.ctx) {

            prev.push({
                'uid': formatStringForUID(`${filename}-${curr.ctx.string}`),
                'isPrivate': curr.isPrivate,
                'type': curr.ctx.type,
                'name': formatStringForName(curr.ctx.string),
                'description': curr.description.full,
                'params': curr.tags.filter(tag =>
                    tag.type === 'param' && !tag.name.match(/\./))
                        .reduce((prev, curr) => {

                            if (prev) {

                                return `${prev}, ${curr.name.replace(/\[|\]/g, '')}`;

                            }

                            return `${curr.name.replace(/\[|\]/g, '')}`;

                        }, ''),
                'tags': {
                    'example': curr.tags.filter(tag => tag.type === 'example')
                        .reduce((prev, curr) => {

                            prev.push(curr.string);

                            return prev;

                        }, []),
                    'param': curr.tags.filter(tag => tag.type === 'param')
                        .reduce((prev, curr) => {

                            prev.push({
                                'name': curr.name.replace(/\[|\]/g, ''),
                                'isOptional': curr.optional,
                                'types': curr.types,
                                'description': curr.description
                            });

                            return prev;

                        }, []),
                    'property': curr.tags.filter(tag => tag.type === 'property')
                        .reduce((prev, curr) => {

                            prev.push({
                                'name': curr.name,
                                'types': curr.types,
                                'description': curr.description
                            });

                            return prev;

                        }, []),
                    'return': curr.tags.filter(tag =>
                        tag.type === 'return' || tag.type === 'returns')
                            .reduce((prev, curr) => {

                                prev.push({
                                    'types': curr.types,
                                    'description': curr.description
                                });

                                return prev;

                            }, [])
                }
            });

        }

        return prev;

    }, []);

module.exports = parser;
