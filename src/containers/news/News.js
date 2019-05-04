import React, { Component } from 'react';
import { getNews } from '../../actions/nonauth/getNews'
import { connect } from 'react-redux'
//  import { Link } from 'react-router-dom'

const mapStateToProps = state => {
    return {
        messages: state.getNewsReducer.messages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getNews: () => dispatch(getNews())
    }
}

class News extends Component {

    state = {
        albums: [
            {
                name: "the black parade",
                img: "bp.jpg"
            },
            {
                name: "three cheers of sweet revange",
                img: "tc.jpg"
            },
            {
                name: "danger days",
                img: "dd.jpg"
            },
            {
                name: "I Brought You My Bullets, You Brought Me Your Love ",
                img: "bull.jpg"
            },
        ],
        history: [
            "With their emo-punk songwriting, theatrical vocals, and neo-goth appearance, My Chemical Romance rose from the East Coast underground to the forefront of modern rock during the early 2000s. In keeping with the tragic element of the group's best-known singles -- including \"Helena,\" \"I\'m Not OK (I Promise),\" and \"Welcome to the Black Parade\" -- My Chemical Romance has roots in catastrophe, as frontman Gerard Way decided to form the band after watching the World Trade Center collapse on September 11, 2001. Drummer Matt Pelissier joined one week later, guitarist Ray Toro climbed aboard soon after, and the quintet\'s ranks solidified with the addition of bassist Mikey Way (Gerard\'s younger brother) and guitarist Frank Iero. With their lineup in place, the bandmates began touring and making plans for an album.",
            "My Chemical Romance's debut, I Brought You My Bullets, You Brought Me Your Love, appeared in 2002 courtesy of New York's Eyeball Records. Comparisons to Thursday were frequent; both bands hailed from New Jersey, both had recorded for Eyeball, and both combined punk-pop's aggression with introspective, confessional lyrics. The album attracted a small underground following, and My Chemical Romance jumped to the big leagues in 2003 by signing with Reprise Records. The following year, they released Three Cheers for Sweet Revenge, a platinum-selling album that featured cover art by Way himself. Although critical reactions were mixed, the record produced several radio singles and popular MTV videos, including \"I\'m Not Okay (I Promise),\" \"Helena,\" and \"The Ghost of You.\"",
            "Pelissier left the lineup in mid-2004 and was replaced by drummer Bob Bryar, who had first met the band while running sound for the Used (with whom the band had toured several years earlier). More touring followed, with My Chemical Romance co-headlining dates alongside Alkaline Trio, scoring an opening slot on Green Day's American Idiot tour, and sharing bills with Story of the Year and Taking Back Sunday. As My Chemical Romance prepared to enter the studio for their third album, they issued a stopgap recording, Life on the Murder Scene, in March 2006. The CD/double-DVD package offered a combination of rarities and live footage, effectively tiding fans over until My Chemical Romance (now boasting a sober and bleach-haired Gerard Way) issued the conceptual, highly ambitious effort The Black Parade in October. The record achieved platinum status by early 2007 and was followed by a live recording, Black Parade Is Dead!, in 2008.",
            "After the rigorous touring for The Black Parade, the band took time out to decompress, especially the brothers Way, who both went through a number of changes, with Mikey dealing with anxiety issues related to touring and Gerard becoming a new father. With all of this happening in their personal lives, the band felt it was time for a change in their professional lives as well. When they returned to the studio, they decided to eschew their gothic image in favor of something fresh and new, replacing the darkness of their previous albums with a newfound exuberance. The band originally went into the studio in 2009 with producer Brendan O'Brien, but unsatisfied with the results, scrapped the project and returned to Black Parade producer Rob Cavallo. With a renewed creative vigor, the band set to work demolishing and reconstructing their abandoned recordings, and in 2010 released Danger Days: The True Lives of the Fabulous Killjoys. Another concept album, it had a manic, Day-Glo energy and more of a punk-pop sound.",
            "The band's final release was a series of five 7\" singles entitled Conventional Weapons, released between October 2012 and February 2013, which collected the unreleased songs they had recorded during the sessions for Danger Days. Shortly thereafter, they announced they were disbanding, on March 22, 2013. Almost exactly a year later, they announced the release of a posthumous best-of compilation entitled May Death Never Stop You: The Greatest Hits 2001–2013, which Way described as their \"epitaph.\" It featured songs from all four of their studio albums, as well as three demos and their final finished studio track, \"Fake Your Death.\" Two years later -- a time span that also saw the release of Hesitant Alien, Gerard Way\'s first solo album -- My Chemical Romance celebrated the tenth anniversary of The Black Parade with the deluxe reissue The Black Parade/Living with Ghosts, which contained a second disc of demos and live tracks."
        ]
    }
    componentDidMount = () => {
        this.props.getNews()
    }
    render() {
        console.log('render', this.props.messages)
        return (
            <div className="News">
                <div className="idea">
                    <div className="idea-wrapper">
                        <div className="not-a-band">it's not a band</div>
                        <div className="short-line"></div>
                        <div className="mcr">my chemical romance</div>
                        <div className="short-line"></div>
                        <div className="an-idea">it's an idea</div>
                    </div>
                </div>
                <div className="history">
                    <div className="line"></div>
                    <div className="history-wrapper">
                        <div className="title"></div>
                        <div className="text">
                            <div className="col">
                                {
                                    this.state.history.map(p => {
                                        return (
                                            <p>
                                                {p}
                                            </p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="line"></div>
                </div>
                <div className="listen">
                    <div className="listen-wrapper">
                        <dir className="title"></dir>
                        <div className="line"></div>
                        <div className="albums">
                            {
                                this.state.albums.map(a => {
                                    return (
                                        <div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(News);