export default function HomeSectionsSkeleton() {
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="h-5 w-32 animate-pulse rounded-full bg-purple-100" />
        <div className="mt-4 h-9 w-80 max-w-full animate-pulse rounded-lg bg-purple-100" />
        <div className="mt-3 h-4 w-72 max-w-full animate-pulse rounded bg-purple-50" />

        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-96 animate-pulse rounded-2xl bg-purple-100/70"
            />
          ))}
        </div>
      </section>

      <section className="border-t border-purple-900/40 bg-purple-950">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="h-5 w-36 animate-pulse rounded-full bg-white/10" />
          <div className="mt-4 h-9 w-80 max-w-full animate-pulse rounded-lg bg-white/10" />
          <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-white/5" />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="h-52 animate-pulse rounded-3xl bg-white/10"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-purple-100 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="h-5 w-40 animate-pulse rounded-full bg-purple-100" />
          <div className="mt-4 h-9 w-72 max-w-full animate-pulse rounded-lg bg-purple-100" />
          <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-purple-50" />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-44 animate-pulse rounded-2xl bg-purple-100/70"
              />
            ))}
          </div>

          <div className="mt-10 grid gap-6 rounded-3xl bg-purple-50/70 p-6 sm:grid-cols-3 sm:p-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-16 animate-pulse rounded-xl bg-purple-100"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
