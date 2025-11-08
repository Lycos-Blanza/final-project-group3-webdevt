export default function SignUpForm({ onLogInClick }) {
  return (
    <form
      className="flex flex-col gap-[18px]"
      onSubmit={e => {
        e.preventDefault();
        // handle signup here
      }}
    >
      <label className="flex flex-col text-[1rem] text-[#222]">
        Name:
        <input
          className="mt-[6px] p-2 border border-[#bbb] rounded text-[1rem]"
          type="text"
          name="name"
          required
          autoComplete="name"
        />
      </label>

      <label className="flex flex-col text-[1rem] text-[#222]">
        Email:
        <input
          className="mt-[6px] p-2 border border-[#bbb] rounded text-[1rem]"
          type="email"
          name="email"
          required
          autoComplete="username"
        />
      </label>

      <label className="flex flex-col text-[1rem] text-[#222]">
        Password:
        <input
          className="mt-[6px] p-2 border border-[#bbb] rounded text-[1rem]"
          type="password"
          name="password"
          required
          autoComplete="new-password"
        />
      </label>

      <label className="flex flex-col text-[1rem] text-[#222]">
        Confirm Password:
        <input
          className="mt-[6px] p-2 border border-[#bbb] rounded text-[1rem]"
          type="password"
          name="confirmPassword"
          required
          autoComplete="new-password"
        />
      </label>

      <button
        type="submit"
        className="mt-3 py-[10px] bg-[#222] text-white rounded text-[1.1rem] cursor-pointer font-bold"
      >
        Submit
      </button>

      <button
        type="button"
        className="mt-[10px] py-2 bg-[#eee] text-[#222] rounded text-[1rem] cursor-pointer font-bold w-full"
        onClick={onLogInClick}
      >
        Log-In
      </button>
    </form>
  );
}
