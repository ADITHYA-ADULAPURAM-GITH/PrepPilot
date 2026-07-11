import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FieldError } from "@/components/common/FieldError";
import { problemSchema } from "@/features/dsa-tracker/schemas";

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

export function ProblemForm({ defaultValues, onSubmit, isSubmitting, submitLabel = "Save" }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: "",
      platform: "LeetCode",
      problemUrl: "",
      topic: "",
      difficulty: "Easy",
      notes: "",
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder="Merge Intervals" error={!!errors.title} {...register("title")} />
        <FieldError message={errors.title?.message} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="platform">Platform</Label>
          <Input id="platform" placeholder="LeetCode" error={!!errors.platform} {...register("platform")} />
          <FieldError message={errors.platform?.message} />
        </div>
        <div>
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select id="difficulty" error={!!errors.difficulty} {...register("difficulty")}>
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>
          <FieldError message={errors.difficulty?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="topic">Topic</Label>
        <Input id="topic" placeholder="Arrays" error={!!errors.topic} {...register("topic")} />
        <FieldError message={errors.topic?.message} />
      </div>

      <div>
        <Label htmlFor="problemUrl">Problem URL (optional)</Label>
        <Input
          id="problemUrl"
          placeholder="https://leetcode.com/problems/..."
          error={!!errors.problemUrl}
          {...register("problemUrl")}
        />
        <FieldError message={errors.problemUrl?.message} />
      </div>

      <div>
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea id="notes" placeholder="Approach, edge cases, follow-ups..." rows={3} {...register("notes")} />
        <FieldError message={errors.notes?.message} />
      </div>

      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
}