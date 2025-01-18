import { Link } from "react-router-dom";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";


export default function EventDetailHeader() {
    const eventImageStyle = {
        filter: 'brightness(30%)'
    }
    const eventImageTextStyle = {
        position: 'absolute',
        bottom: '10%',
        left: '10%',
        width: '100%',
        height: 'auto',
        color: 'white'
    }
    return (
        <Segment.Group>
            <Segment basic attached="top" style={{ padding: '0' }}>
                <Image src='http://localhost:3000/categoryImages/drinks.jpg' style={eventImageStyle} />
                <Segment basic style={eventImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size="huge"
                                    content='Event Title'
                                    style={{ color: 'white' }}
                                />
                                <p>Event Date</p>
                                <p>
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>

            <Segment attached="bottom">
                <Button>Cancel My Place</Button>
                <Button color="teal">JOIN THIS EVENT</Button>

                <Button as={Link} to={'/manage/abc'} color="orange" floated="right">
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>

    )
}