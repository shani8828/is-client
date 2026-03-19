export default function CameraStream() {
  return (
    <div className="w-full px-4 py-6">
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-br
          from-indigo-600/10
          via-purple-600/10
          to-sky-500/10
          backdrop-blur-xl
          border
          border-gray-200/30
          shadow-xl
          transition-all
          duration-700
          ease-out
          hover:shadow-2xl
          hover:shadow-indigo-500/30
        "
      >
        {/* ambient moving glow */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-blue-500/20
            via-indigo-500/20
            to-purple-500/20
            opacity-60
            blur-3xl
            animate-pulse
          "
        />

        {/* header bar */}
        <div
          className="
            relative
            z-10
            flex
            items-center
            justify-between
            px-6
            py-4
            border-b
            border-gray-200/20
            bg-white/40
            backdrop-blur-lg
          "
        >
          <h2
            className="
              text-lg
              font-semibold
              tracking-wide
              text-indigo-600
            "
          >
            Live Camera Stream
          </h2>

          <span
            className="
              text-xs
              px-3
              py-1
              rounded-full
              font-medium
              text-purple-600
              bg-purple-500/10
              border
              border-purple-300/30
            "
          >
            STREAM
          </span>
        </div>

        {/* stream area */}
        <div
          className="
            relative
            z-10
            flex
            items-center
            justify-center
            aspect-video
            bg-gradient-to-br
            from-gray-100
            to-gray-200
          "
        >
          {/* inner frame */}
          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-3
              text-center
              px-6
            "
          >
            <div
              className="
                text-2xl
                font-bold
                bg-gradient-to-r
                from-indigo-600
                via-purple-600
                to-sky-600
                bg-clip-text
                text-transparent
              "
            >
              Camera Stream
            </div>

            <p
              className="
                text-sm
                text-gray-500
                max-w-xs
              "
            >
              Live feed will appear here once the camera is connected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}