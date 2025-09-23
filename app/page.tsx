import ChatArea from "@/components/chatArea";

export default function Home() {
  return (
    <div className="flex-col justify-center align-middle items-center">
      <div className="text-gray-400 font-bold my-3 w-30 mx-auto text-2xl">Naval GPT</div> 
      <ChatArea />
    </div>
  );
}
