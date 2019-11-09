#!/usr/bin/env python3
# -*- coding: utf-8 -*
import argparse
import torch
from torch.autograd import Variable

from net import Net
import utils


def arg_parse():
    parser = argparse.ArgumentParser()
    parser.add_argument('--image',
                        metavar='PATH',
                        help='image')
    parser.add_argument('--style-image',
                        metavar='PATH',
                        help='image')
    parser.add_argument('--out-image',
                        metavar='PATH',
                        help='image')
    
    parser.add_argument("--cuda", type=int, default=1,
                        help="set it to 1 for running on GPU, 0 for CPU")
    
    parser.add_argument("--style-size", type=int, default=512,
                        help="size of style-image, default is the "
                             "original size of style image")
    
    parser.add_argument("--model", type=str, required=True,
                        help="saved model to be used for stylizing the image")
    parser.add_argument("--ngf", type=int, default=128,
                        help="number of generator filter channels, default 128")
    
    parser.add_argument("--w", type=int, default=256,
                        help="width, default 256")
    parser.add_argument("--h", type=int, default=256,
                        help="height, default 256")
    
    return parser.parse_args()


def predict(args):
    style_model = Net(ngf=args.ngf)
    model_dict = torch.load(args.model)
    model_dict_clone = model_dict.copy()
    for key, value in model_dict_clone.items():
        if key.endswith(('running_mean', 'running_var')):
            del model_dict[key]
    style_model.load_state_dict(model_dict, False)
    style_model.eval()
    if args.cuda:
        style_model.cuda()
    
    img = utils.tensor_load_rgbimage(args.image, (args.w, args.h))
    img = img.unsqueeze(0).float()
    if args.cuda:
        img = img.cuda()
    img = Variable(img)
    
    style = utils.tensor_load_rgbimage(args.style_image, args.style_size)
    style = style.unsqueeze(0)
    style = utils.preprocess_batch(style)
    if args.cuda:
        style = style.cuda()
    style = Variable(style, requires_grad=False)
    style_model.set_target(style)
    
    img = style_model(img)
    
    utils.tensor_save_rgbimage(img, args.out_image, args.cuda)


def main():
    # getting things ready
    args = arg_parse()
    if args.cuda and not torch.cuda.is_available():
        raise ValueError("ERROR: cuda is not available, try running on CPU")
    
    # run demo
    predict(args)


if __name__ == '__main__':
    main()
