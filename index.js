const dox = require('dox');

const formatStringForName = content =>
    content.toString()
        .replace(/module\.exports\.|\.prototype|\(\)/g, '');

const formatStringForParam = content =>
    content.toString()
        .replace(/\[|\]/g, '');

const formatStringForUID = content =>
    content.toString()
        .toLowerCase()
        .replace(/[^\w\.]+/g, '-')
        .replace(/^-|-$/g, '');

const parser = (content, filename) =>
    dox.parseComments(content, {'raw': true}).filter(method => !method.ignore && method.ctx)
        .map(method => ({
            'uid': formatStringForUID(`${filename}-${method.ctx.string}`),
            'isPrivate': method.isPrivate,
            'type': method.ctx.type,
            'name': formatStringForName(method.ctx.string),
            'description': method.description.full,
            'params': method.tags.filter(tag =>
                tag.type === 'param' && !tag.name.match(/\./))
                    .map(tag => {

                        if (tag.optional) {

                            return `[${formatStringForParam(tag.name)}]`;

                        }

                        return formatStringForParam(tag.name);

                    })
                    .join(', ')
                    .replace(/\], \[/g, ', '),
            'tags': {
                'example': method.tags.filter(tag => tag.type === 'example')
                    .map(tag => tag.string),
                'param': method.tags.filter(tag => tag.type === 'param')
                    .map(tag => ({
                        'name': formatStringForParam(tag.name),
                        'isOptional': tag.optional,
                        'types': tag.types,
                        'description': tag.description
                    })),
                'property': method.tags.filter(tag => tag.type === 'property')
                    .map(tag => ({
                        'name': tag.name,
                        'types': tag.types,
                        'description': tag.description
                    })),
                'return': method.tags.filter(tag =>
                    tag.type === 'return' || tag.type === 'returns')
                        .map(tag => ({
                            'types': tag.types,
                            'description': tag.description
                        }))
            }
        }));

module.exports = parser;
