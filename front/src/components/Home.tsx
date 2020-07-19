import * as React from 'react';

export function Home(props: any) {
  return (
    <div className="Home">
      <ol>
        <li>Click the 'Play' button.</li>
        <li>Enter the settings you'd like to use and click 'Start'.</li>
        <li>Click where the note is played on the fretboard.</li>
        <li>Try to get the highest score.</li>
      </ol>
    </div>
  );
}