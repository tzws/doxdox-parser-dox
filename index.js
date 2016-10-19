const dox = require('dox');

const formatStringForName = content =>
    content.toString()
        .replace(/\.prototype|\(\)/g, '');

const formatStringForParam = content =>
    content.toString()
        .replace(/\[|\]/g, '');

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
                        .map(tag => formatStringForParam(tag.name))
                        .join(', '),
                'tags': {
                    'example': curr.tags.filter(tag => tag.type === 'example')
                        .map(tag => tag.string),
                    'param': curr.tags.filter(tag => tag.type === 'param')
                        .map(tag => ({
                            'name': formatStringForParam(tag.name),
                            'isOptional': tag.optional,
                            'types': tag.types,
                            'description': tag.description
                        })),
                    'property': curr.tags.filter(tag => tag.type === 'property')
                        .map(tag => ({
                            'name': tag.name,
                            'types': tag.types,
                            'description': tag.description
                        })),
                    'return': curr.tags.filter(tag =>
                        tag.type === 'return' || tag.type === 'returns')
                            .map(tag => ({
                                'types': tag.types,
                                'description': tag.description
                            }))
                }
            });

        }

        return prev;

    }, []);

module.exports = parser;
