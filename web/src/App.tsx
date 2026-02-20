import React from 'react';
import AddLotteryButton from './components/AddLotteryButton';
import AddLotteryModal from './components/AddLotteryModal';
import Notification from './components/Notification';

function App() {
  const [openModal, setOpenModal] = React.useState(false);
  const [openToast, setOpenToast] = React.useState(false);

  return (
    <>
      <div>
        <h1>Vite + React</h1>
        <AddLotteryButton onClick={() => setOpenModal(true)} />
        <AddLotteryModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSuccess={() => setOpenToast(true)}
        />
        <Notification
          open={openToast}
          message="Lottery added successfully"
          onClose={() => setOpenToast(false)}
        />
      </div>
    </>
  );
}

export default App;
