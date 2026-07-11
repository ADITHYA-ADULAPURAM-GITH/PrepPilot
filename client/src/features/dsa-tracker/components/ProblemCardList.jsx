import { ProblemCard } from "@/features/dsa-tracker/components/ProblemCard";

export function ProblemCardList({ problems }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
      {problems.map((problem) => (
        <ProblemCard key={problem._id} problem={problem} />
      ))}
    </div>
  );
}