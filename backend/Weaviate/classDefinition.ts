const classObj = {
    class: 'EOC',
    description: 'Information from EOC document',
    properties: [
        {
            dataType: ['text'],
            description: 'The current user Id',
            name: 'UID',
            moduleConfig: {
                'text2vec-cohere': {
                    skip: true
                },
            },
        },
        {
            dataType: ['text'],
            description: 'Closest information related to provided question',
            name: 'information',
        },
    ],
    vectorizer: 'text2vec-cohere',
    vectorIndexConfig: {
        distance: 'cosine',
    },
    moduleConfig: {
        'text2vec-cohere': {},
        'generative-cohere': {},
    }
}

export default classObj;