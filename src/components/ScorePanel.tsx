import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';

interface ScorePanelProps {
  score: number;
  bestScore: number;
  streak: number;
  isGameOver: boolean;
  onReset: () => void;
}

const ScorePanel = ({ score, bestScore, streak, isGameOver, onReset }: ScorePanelProps) => {
  return (
    <Stack spacing={3} sx={{ minWidth: { xs: '100%', lg: 280 } }}>
      <Paper
        elevation={10}
        sx={{
          p: 3,
          borderRadius: 4,
          background: 'linear-gradient(145deg, rgba(38,50,56,0.8), rgba(69,90,100,0.55))',
          border: '1px solid rgba(120, 144, 156, 0.35)',
        }}
      >
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CelebrationOutlinedIcon color="primary" />
            <Typography variant="overline" letterSpacing={2} color="primary.light">
              Scoreboard
            </Typography>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="h4" fontWeight={700}>
              {score.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current Score
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Stack spacing={0.5}>
              <Typography variant="h6">{bestScore.toLocaleString()}</Typography>
              <Typography variant="caption" color="text.secondary">
                Best Score
              </Typography>
            </Stack>
            <Stack spacing={0.5}>
              <Typography variant="h6">{streak}</Typography>
              <Typography variant="caption" color="text.secondary">
                Combo Streak
              </Typography>
            </Stack>
          </Stack>
          {isGameOver ? (
            <Chip
              color="error"
              label="No more moves – reset to try again!"
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
          ) : (
            <Chip
              color="success"
              variant="outlined"
              label={streak > 0 ? `Combo x${streak}! Keep it going!` : 'Chain clears for combo bonuses.'}
              sx={{ borderRadius: 2 }}
            />
          )}
        </Stack>
      </Paper>
      <Button
        variant="contained"
        color="secondary"
        onClick={onReset}
        size="large"
        startIcon={<RestartAltRoundedIcon />}
        sx={{ borderRadius: 3, py: 1.2 }}
      >
        Reset Session
      </Button>
    </Stack>
  );
};

export default ScorePanel;
