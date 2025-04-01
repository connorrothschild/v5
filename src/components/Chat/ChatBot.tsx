import { Message, useChat } from "@ai-sdk/react";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type BlogRecommendation = {
  title: string;
  id: string;
  reason: string;
};

function BlogRecommendationCard({ post }: { post: BlogRecommendation }) {
  return (
    <Link
      href={`/writing/${post.id}`}
      className="block px-4 py-3 mb-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <h3 className="text-base mb-1">{post.title}</h3>
      <p className="text-sm text-[#666666]">{post.reason}</p>
    </Link>
  );
}

function MessageText({ text }: { text: string }) {
  // Split text into paragraphs on double newlines
  const paragraphs = text.split(/\n\n+/);

  return (
    <>
      {paragraphs.map((paragraph, i) => (
        <div
          key={i}
          className="text-sm md:text-base leading-snug mb-3 last:mb-0"
        >
          {/* Replace single newlines with <br /> */}
          {paragraph.split("\n").map((line, j) => (
            <p key={j}>
              {line}
              {j < paragraph.split("\n").length - 1 && <br />}
            </p>
          ))}
        </div>
      ))}
    </>
  );
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat({});

  const messagesPlusFakeIntroMessage = useMemo(() => {
    return [
      {
        id: "intro",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hi, I'm here to help you find a blog post. What are you looking for?",
          },
        ],
      } as Message,
      ...(messages as Message[]),
    ];
  }, [messages]);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full p-4 shadow-sm z-50"
      >
        <span>Need help finding a post?</span>
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed bottom-4 right-4 w-[calc(100%-2rem)] md:w-96 rounded-lg border border-gray-200 bg-white p-4 shadow-xl z-[51]"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base leading-none">Blog Post Assistant</h2>
              <button
                className="text-lg leading-none"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="min-h-[150px] max-h-[min(80vh,400px)] mb-4 relative scrollbar-hide">
              <div className="min-h-[150px] max-h-[min(80vh,400px)] overflow-y-auto scrollbar-hide pt-4">
                {/* Scrim at top and bottom */}
                <div className="pointer-events-none absolute top-[-1px] left-0 w-full h-4 bg-gradient-to-b from-white to-transparent z-10" />
                <div className="pointer-events-none absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-white to-transparent z-10" />
                {messagesPlusFakeIntroMessage.map((message) => {
                  return (
                    <div
                      key={message.id}
                      className={`mb-4 w-fit max-w-[90%] p-3 rounded-lg ${
                        message.role === "assistant"
                          ? "bg-gray-50 bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200"
                          : "bg-blue-50 bg-gradient-to-l from-blue-100 to-blue-50 border border-blue-200 ml-auto text-right text-blue-700"
                      }`}
                    >
                      {/* @ts-expect-error I faked the message above. */}
                      {message.parts.map((part, index) => {
                        switch (part.type) {
                          case "text":
                            return <MessageText key={index} text={part.text} />;

                          case "tool-invocation": {
                            if (part.toolInvocation.state === "call") {
                              return (
                                <div
                                  className="bg-gray-300 animate-pulse h-2 w-20 rounded-full"
                                  key={index}
                                />
                              );
                            }
                            if (
                              part.toolInvocation.toolName ===
                                "recommendBlogPost" &&
                              part.toolInvocation.state === "result"
                            ) {
                              return (
                                <BlogRecommendationCard
                                  key={part.toolInvocation.toolCallId}
                                  post={part.toolInvocation.result}
                                />
                              );
                            }
                            return null;
                          }
                          default:
                            return null;
                        }
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="What kind of content are you looking for?"
                  className="flex-1 text-sm z-[9] relative"
                />
                <div className="absolute z-10 right-[1px] top-[1px] h-[calc(100%-2px)] rounded-md w-6 bg-gradient-to-l from-white to-transparent via-white" />
              </div>
              <Button type="submit">Send</Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
