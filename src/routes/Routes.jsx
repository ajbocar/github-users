import { Route, Routes as Switch } from 'react-router-dom';

import Missing from '@src/pages/Missing';
import Projects from '@src/pages/Projects';

const Routes = () => (
  <Switch>
    <Route path="/" element={<Projects />} />
    <Route path="*" element={<Missing />} />
  </Switch>
);

export default Routes;
