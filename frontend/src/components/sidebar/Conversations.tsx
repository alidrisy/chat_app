import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";

const Conversations = () => {

	const { isLoading, conversations } = useGetConversations()
	if (isLoading) {
		return (
			<div className='py-2 flex flex-col overflow-auto justify-center items-center h-full'>
				<div className="lds-roller text-white"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
			</div>

		);
	}
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation) => (
				<Conversation key={conversation.id} conversation={conversation} emoji={getRandomEmoji()} />
			))}
		</div>
	);
};
export default Conversations;
