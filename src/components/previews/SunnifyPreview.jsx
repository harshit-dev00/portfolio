import React from "react";

export default function SunnifyPreview() {
  return (
    <div className="h-full w-full grid grid-cols-2 bg-[#0f1115]">
      <div className="bg-gradient-to-br from-sky-400 to-violet-500 p-4 text-left relative">
        <span className="absolute top-2 left-2 text-[9px] text-black/50">v1.0.0</span>
        <span className="absolute top-2 right-2 text-[10px] text-black/60">x</span>
        <p className="text-black font-bold text-sm mt-4">Sunnify</p>
        <p className="text-black/60 text-[9px] mb-3">
          Spotify Downloader — Created By Sunny Patel
        </p>
        <p className="text-black/70 text-[9px] font-mono break-all mb-3">
          /2gNLiR55v6yQAQoprmxPAv
        </p>
        <p className="text-black/60 text-[9px]">Playlist Name:</p>
        <p className="text-black/80 text-[9px] mb-2">Moonlight - XXXTENTACION</p>
        <div className="flex gap-2 text-[8px] text-black/60">
          <span>☑ Show Preview</span>
          <span>☑ Add Meta Tags</span>
        </div>
      </div>
      <div className="bg-gradient-to-br from-violet-400 to-sky-300 p-4 text-left">
        <p className="text-black font-bold text-[11px] underline mb-3">
          Song Information
        </p>
        <div className="w-14 h-14 bg-black/10 border border-black/20 flex items-center justify-center text-lg mb-2">
          ?
        </div>
        <p className="text-black/70 text-[9px]">Song: Moonlight</p>
        <p className="text-black/70 text-[9px]">Released: 2018-03-16</p>
        <p className="text-black/70 text-[9px]">Artist: XXXTENTACION</p>
        <p className="text-black/70 text-[9px]">Album: ?</p>
      </div>
    </div>
  );
}