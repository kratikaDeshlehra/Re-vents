
import { Segment, Header, Comment } from "semantic-ui-react";
import ChatForm from "./ChatForm";
import { useEffect, useState } from "react";
import { ChatComment } from "../../../app/types/event";
import { onChildAdded, ref } from "firebase/database";
import { fb } from "../../../app/config/Firebase";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

type Props = {
    eventId: string,

}

export default function EventDetailChats({ eventId }: Props) {
    const [comments, setComments] = useState<ChatComment[]>([]);

    const [replyForm, setReplyForm] = useState<any>({
        open: false,
        commentId: null
    })

    useEffect(() => {
        const chatRef = ref(fb, `chat/${eventId}`)
        const unsubscribe = onChildAdded(chatRef, data => {
            const comment = { ...data.val(), id: data.key };
            setComments(prevState => ([
                ...prevState, comment
            ]))
        });

        return () => {
            unsubscribe();
        }

    }, [eventId])

    function createCommentTree(data: ChatComment[]) {
        const table = Object.create(null);

        data.forEach(item => table[item.id] = { ...item, childNodes: [] });
        const dataTree: ChatComment[] = [];

        data.forEach(item => {
            if (item.parentId) table[item.parentId].childNodes.push(table[item.id]);
            else dataTree.push(table[item.id])
        })
        return dataTree;
    }

    return (

        <>
            <Segment
                textAlign="center"
                attached="top"
                inverted
                color="teal"
                style={{ border: 'none' }}
            >
                <Header>Chat about this event</Header>
            </Segment>

            <Segment attached>
                <Comment.Group>
                    {createCommentTree(comments).map(comment => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.photoURL || "/categoryImages/user.png"} />
                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profiles/${comment.uid}`}>{comment.displayName}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{formatDistance(comment.date, new Date())} ago</div>
                                </Comment.Metadata>
                                <Comment.Text>{comment.text}</Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action
                                        onClick={() => setReplyForm({ open: true, commenId: comment.id })}
                                    >
                                        Reply
                                    </Comment.Action>
                                    {replyForm.open && replyForm.commenId === comment.id && (
                                        <ChatForm
                                            key={comment.id}
                                            eventId={eventId}
                                            parentId={comment.id}
                                            setReplyForm={setReplyForm}
                                        />
                                    )}
                                </Comment.Actions>
                            </Comment.Content>

                            <Comment.Group style={{ paddingBottom: '0' }}>
                                {comment.childNodes.map(child => (
                                    <Comment key={child.id}>
                                        <Comment.Avatar src={child.photoURL || "/categoryImages/user.png"} />
                                        <Comment.Content>
                                            <Comment.Author as={Link} to={`/profiles/${child.uid}`}>{child.displayName}</Comment.Author>
                                            <Comment.Metadata>
                                                <div>{formatDistance(child.date, new Date())} ago</div>
                                            </Comment.Metadata>
                                            <Comment.Text>{child.text}</Comment.Text>
                                            <Comment.Actions>
                                                <Comment.Action
                                                    onClick={() => setReplyForm({ open: true, commenId: child.id })}
                                                >
                                                    Reply
                                                </Comment.Action>
                                                {replyForm.open && replyForm.commenId === child.id && (
                                                    <ChatForm
                                                        key={comment.id}
                                                        eventId={eventId}
                                                        parentId={child.parentId}
                                                        setReplyForm={setReplyForm}
                                                    />
                                                )}
                                            </Comment.Actions>
                                        </Comment.Content>
                                    </Comment>

                                ))}

                            </Comment.Group>
                        </Comment>
                    ))}

                </Comment.Group>

                <ChatForm eventId={eventId} />
            </Segment>
        </>


    )
}
