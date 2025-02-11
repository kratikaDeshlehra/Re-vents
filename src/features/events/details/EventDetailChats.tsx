
import { Segment, Header,Comment} from "semantic-ui-react";
import ChatForm from "./ChatForm";
import { useEffect, useState } from "react";
import { ChatComment } from "../../../app/types/event";
import { onChildAdded, ref } from "firebase/database";
import { fb } from "../../../app/config/Firebase";
import { Link } from "react-router-dom";

type Props={
    eventId : string,

}

export default function EventDetailChats({eventId} : Props) {
    const [comments, setComments]=useState<ChatComment[]> ([]);

    useEffect(()=>{
       const chatRef=ref(fb,`chat/${eventId}`)
       const unsubscribe=onChildAdded(chatRef, data => {
        const comment={...data.val(),id : data.key};
          setComments(prevState => ([
            ...prevState, comment
          ]))
       }); 

       return ()=>{
        unsubscribe();
       }

    },[eventId])

  return (
   
<>
<Segment
    textAlign="center"
    attached="top"
    inverted
    color="teal"
    style={{border: 'none'}}
>
    <Header>Chat about this event</Header>
</Segment>

<Segment attached>
    <Comment.Group>
        {comments.map(comment => (
              <Comment key={comment.id}>
              <Comment.Avatar src={comment.photoURL || "/categoryImages/user.png"}/>
              <Comment.Content>
                  <Comment.Author as={Link} to={`/profiles/${comment.uid}`}>{comment.displayName}</Comment.Author>
                  <Comment.Metadata>
                      <div>{comment.date}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.text}</Comment.Text>
                  <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
              </Comment.Content>
          </Comment>
        ))}
       
    </Comment.Group> 

    <ChatForm eventId={eventId}/>
</Segment>
</>


  )
}
