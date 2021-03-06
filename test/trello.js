process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

const commentJSON = {
    model: {
        id: '594474056f0b649912106a39',
        name: 'Example Board',
        desc: '',
        descData: null,
        closed: false,
        idOrganization: '594367c357bfca66e9a9ab95',
        pinned: false,
        url: 'https://trello.com/b/EcmJGI6e/example-board',
        shortUrl: 'https://trello.com/b/EcmJGI6e',
        prefs: {
            permissionLevel: 'org',
            voting: 'members',
            comments: 'members',
            invitations: 'members',
            selfJoin: true,
            cardCovers: true,
            cardAging: 'regular',
            calendarFeedEnabled: false,
            background: 'red',
            backgroundImage: null,
            backgroundImageScaled: null,
            backgroundTile: false,
            backgroundBrightness: 'dark',
            backgroundColor: '#B04632',
            canBePublic: true,
            canBeOrg: true,
            canBePrivate: true,
            canInvite: true
        },
        labelNames: {
            green: '',
            yellow: '',
            orange: 'Orange',
            red: 'Hey',
            purple: '',
            blue: '',
            sky: '',
            lime: '',
            pink: '',
            black: ''
        }
    },
    action: {
        id: '5946eae0be7d3669fc554adf',
        idMemberCreator: '5815a74cfb5de00705368af8',
        data: {
            list: {
                name: 'Examples',
                id: '5945ed8cdd0d2df8355dc386'
            },
            board: {
                shortLink: 'EcmJGI6e',
                name: 'Example Board',
                id: '594474056f0b649912106a39'
            },
            card: {
                shortLink: 'Hz7qP25x',
                idShort: 20,
                name: 'Example Card',
                id: '594605ec8ed6b8a75e11596b'
            },
            text: '**Example Comment**\n\nThis is an example comment.'
        },
        type: 'commentCard',
        date: '2017-06-18T21:04:32.955Z',
        memberCreator: {
            id: '5815a74cfb5de00705368af8',
            avatarHash: '1a36134efab762cad3aadd250440b715',
            fullName: 'Daniel Scalzi',
            initials: 'DS',
            username: 'danielscalzi'
        },
        display: {
            translationKey: 'action_comment_on_card',
            entities: {
                contextOn: {
                    type: 'translatable',
                    translationKey: 'action_on',
                    hideIfContext: true,
                    idContext: '594605ec8ed6b8a75e11596b'
                },
                card: {
                    type: 'card',
                    hideIfContext: true,
                    id: '594605ec8ed6b8a75e11596b',
                    shortLink: 'Hz7qP25x',
                    text: 'Example Card'
                },
                comment: {
                    type: 'comment',
                    text: '**Example Comment**\n\nThis is an example comment.'
                },
                memberCreator: {
                    type: 'member',
                    id: '5815a74cfb5de00705368af8',
                    username: 'danielscalzi',
                    text: 'Daniel Scalzi'
                }
            }
        }
    }
};

/*
* Test the /POST route
*/
describe('/POST trello', () => {
    it('commentCard', (done) => {
        chai.request(server)
            .post('/api/webhooks/test/test/trello')
            .set('test', 'true')
            .send(commentJSON)
            .end((err, res) => {
                res.should.have.status(200);
                console.log(res.body);
                res.body.should.be.a('object');
                res.body.should.have.property('embeds');
                done();
            });
    });
});