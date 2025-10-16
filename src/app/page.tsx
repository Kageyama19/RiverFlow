import Link from "next/link";
import QuestionCard from "@/components/QuestionCard";
import { databases, users } from "@/models/server/config";
import {
  answerCollection,
  db,
  voteCollection,
  questionCollection,
} from "@/models/name";
import { Query } from "node-appwrite";

// This needs to be an async component
export default async function Home() {
  // Query: get 3 most recent questions
  const queries = [Query.orderDesc("$createdAt"), Query.limit(3)];

  const questions = await databases.listDocuments(
    db,
    questionCollection,
    queries
  );

  // Enrich with author, answers, votes, as in your questions page
  questions.documents = await Promise.all(
    questions.documents.map(async (ques) => {
      const [author, answers, votes] = await Promise.all([
        users.get(ques.authorId),
        databases.listDocuments(db, answerCollection, [
          Query.equal("questionId", ques.$id),
          Query.limit(1),
        ]),
        databases.listDocuments(db, voteCollection, [
          Query.equal("type", "question"),
          Query.equal("typeId", ques.$id),
          Query.limit(1),
        ]),
      ]);

      return {
        ...ques,
        totalAnswers: answers.total,
        totalVotes: votes.total,
        author: {
          $id: author.$id,
          reputation: author.prefs.reputation,
          name: author.name,
        },
      };
    })
  );

  return (
    <div className="font-sans min-h-screen bg-black text-white">
      <main className="py-8 mt-20 relative bg-black">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <h1 className="text-4xl border-b border-b-blue-400 px-3 py-2 font-bold text-center sm:text-left mb-6 text-white">
            RiverFlow
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: Question Cards */}
            <div className="md:col-span-2 flex flex-col gap-6">
              <h2 className="text-2xl font-semibold mb-2 text-white">
                Recently asked questions
              </h2>
              {questions.documents.map((ques) => (
                <QuestionCard key={ques.$id} ques={ques} />
              ))}
            </div>
            {/* Right: Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Popular Tags */}
              <div className="bg-[#141414] rounded-xl border border-white p-6">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Popular Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {["React", "JavaScript", "Tailwind CSS", "Next.js"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="bg-black text-white border border-[#333] px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
              {/* Ask a Question */}
              <div className="bg-[#141414] rounded-xl border border-white p-6">
                <h2 className="text-xl font-semibold mb-2 text-white">
                  Ask a Question
                </h2>
                <textarea
                  className="w-full p-4 mt-2 border border-[#333] bg-black text-white rounded-md"
                  rows={5}
                  placeholder="What do you need help with?"
                ></textarea>
                <button className="mt-4 w-full bg-black text-white border border-white py-2 rounded-lg hover:bg-[#222]">
                  Submit Question
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-black text-white py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center space-x-6">
            <Link href="#">
              <span className="text-white hover:text-gray-400 transition-all duration-300">
                About
              </span>
            </Link>
            <Link href="#">
              <span className="text-white hover:text-gray-400 transition-all duration-300">
                Blog
              </span>
            </Link>
            <Link href="#">
              <span className="text-white hover:text-gray-400 transition-all duration-300">
                Terms
              </span>
            </Link>
            <Link href="#">
              <span className="text-white hover:text-gray-400 transition-all duration-300">
                Privacy
              </span>
            </Link>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            <p>&copy; 2025 RiverFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
