export default function SignUpForm({ onLogInClick }) {
  return (
    <form
      className="flex flex-col gap-[18px]"
      onSubmit={e => {
        e.preventDefault();
        // handle signup here
      }}
    >
      <label className="flex flex-col text-[1rem] text-[#5C3A2E]">
        Name:
        <input
          className="mt-[6px] p-2 border border-[#5C3A2E] rounded text-[1rem] bg-[#E9D3BE]"
          type="text"
          name="name"
          required
          autoComplete="name"
        />
      </label>

      <label className="flex flex-col text-[1rem] text-[#5C3A2E]">
        Email:
        <input
          className="mt-[6px] p-2 border border-[#5C3A2E] rounded text-[1rem] bg-[#E9D3BE]"
          type="email"
          name="email"
          required
          autoComplete="username"
        />
      </label>

      <label className="flex flex-col text-[1rem] text-[#5C3A2E]">
        Password:
        <input
          className="mt-[6px] p-2 border border-[#5C3A2E] rounded text-[1rem] bg-[#E9D3BE]"
          type="password"
          name="password"
          required
          autoComplete="new-password"
        />
      </label>

      <label className="flex flex-col text-[1rem] text-[#5C3A2E]">
        Confirm Password:
        <input
          className="mt-[6px] p-2 border border-[#5C3A2E] rounded text-[1rem] bg-[#E9D3BE]"
          type="password"
          name="confirmPassword"
          required
          autoComplete="new-password"
        />
      </label>

      <button
        type="submit"
        className="mt-3 py-[10px] bg-[#5C3A2E] text-[#E9D3BE] rounded text-[1.1rem] cursor-pointer font-bold"
      >
        Submit
      </button>

      <button
        type="button"
        className="mt-[10px] py-2 bg-transparent text-[#5C3A2E] rounded text-[1rem] cursor-pointer font-bold w-full border border-[#5C3A2E]"
        onClick={onLogInClick}
      >
        Log-In
      </button>
    </form>
  );
}
