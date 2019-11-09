import os

import numpy as np
import torch
from PIL import Image
from torch.autograd import Variable


def tensor_load_rgbimage(filename, size=None, scale=None, keep_asp=False):
    img = Image.open(filename).convert('RGB')
    if size is not None:
        if type(size) is tuple and len(size) == 2:
            img = img.resize((size[0], size[1]), Image.ANTIALIAS)
        elif keep_asp:
            size2 = int(size * 1.0 / img.size[0] * img.size[1])
            img = img.resize((size, size2), Image.ANTIALIAS)
        else:
            img = img.resize((size, size), Image.ANTIALIAS)
    
    elif scale is not None:
        img = img.resize((int(img.size[0] / scale), int(img.size[1] / scale)), Image.ANTIALIAS)
    img = np.array(img).transpose(2, 0, 1)
    img = torch.from_numpy(img).float()
    return img


def tensor_save_rgbimage(tensor, filename, cuda=False):
    if cuda:
        img = tensor.clone().cpu().clamp(0, 255).detach().numpy()
    else:
        img = tensor.clone().clamp(0, 255).detach().numpy()
    if len(img.shape) == 4:
        img = img.squeeze(0)
    img = img.transpose(1, 2, 0).astype('uint8')
    img = Image.fromarray(img)
    img.save(filename)


def preprocess_batch(batch):
    batch = batch.transpose(0, 1)
    (r, g, b) = torch.chunk(batch, 3)
    batch = torch.cat((b, g, r))
    batch = batch.transpose(0, 1)
    return batch


class SingleStyleLoader:
    
    def __init__(self, style_image, style_size, cuda=True):
        self.image = style_image
        self.style_size = style_size
        self.cuda = cuda
    
    def get(self):
        style = tensor_load_rgbimage(self.image, self.style_size)
        style = style.unsqueeze(0)
        style = preprocess_batch(style)
        if self.cuda:
            style = style.cuda()
        style_v = Variable(style, requires_grad=False)
        return style_v

