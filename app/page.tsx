import ChatArea from "@/components/chatArea";

export default function Home() {
  return (
    <div className="flex-col justify-center">
      <div className="text-gray-400 font-bold my-3 max-w-40 mx-auto text-2xl">Naval GPT</div> 
      <ChatArea />
    </div>
  );
}
